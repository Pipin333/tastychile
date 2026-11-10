"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  filterComunasRM,
  normalizeComunaRM,
  isKnownRuralRM,
} from "@/lib/comunas-rm";

interface ComunaComboboxProps {
  id?: string;
  name?: string;
  defaultValue?: string;
  disabled?: boolean;
}

/**
 * Accessible searchable select (combobox) for the 52 comunas of the Región Metropolitana.
 * Matches accent-insensitively ("nunoa", "nunos", "ÑUÑOA" -> "Ñuñoa") and locks selection to a canonical RM comuna.
 */
export default function ComunaCombobox({
  id = "order-city",
  name = "city",
  defaultValue = "Providencia",
  disabled = false,
}: ComunaComboboxProps) {
  const [selectedComuna, setSelectedComuna] = useState<string>(defaultValue);
  const [query, setQuery] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listboxId = `${id}-listbox`;

  const filteredComunas = filterComunasRM(query);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openDropdown = () => {
    if (disabled) return;
    setIsOpen(true);
    setQuery("");
    setHighlightedIndex(0);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 10);
  };

  const selectOption = (comuna: string) => {
    setSelectedComuna(comuna);
    setIsOpen(false);
    setQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        openDropdown();
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        filteredComunas.length > 0 ? (prev + 1) % filteredComunas.length : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        filteredComunas.length > 0
          ? (prev - 1 + filteredComunas.length) % filteredComunas.length
          : 0
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredComunas[highlightedIndex]) {
        selectOption(filteredComunas[highlightedIndex]);
      } else {
        const directMatch = normalizeComunaRM(query);
        if (directMatch) {
          selectOption(directMatch);
        }
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
      setQuery("");
    }
  };

  return (
    <div ref={containerRef} className="relative" onKeyDown={handleKeyDown}>
      {/* Hidden input always submits the canonical RM comuna name */}
      <input type="hidden" name={name} value={selectedComuna} />

      <button
        id={id}
        type="button"
        disabled={disabled}
        onClick={() => (isOpen ? setIsOpen(false) : openDropdown())}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        className="w-full flex items-center justify-between bg-[#FAF6F0] border border-[#DFD3C3] rounded-lg px-3.5 py-2.5 text-sm text-[#2A1B12] text-left focus:outline-none focus:ring-2 focus:ring-[#9E2A2B] disabled:opacity-50"
      >
        <span className="truncate">{selectedComuna}</span>
        <svg
          className={`w-4 h-4 text-[#6E5D4F] transition-transform duration-150 flex-shrink-0 ml-2 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 z-50 mt-1.5 bg-[#FFFDF9] border border-[#DFD3C3] rounded-xl shadow-lg overflow-hidden">
          <div className="p-2 border-b border-[#DFD3C3] bg-[#F3ECE1]">
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setHighlightedIndex(0);
              }}
              placeholder="Buscar comuna (ej: nunoa, provi, maipu)..."
              aria-label="Buscar comuna de la Región Metropolitana"
              className="w-full bg-[#FAF6F0] border border-[#DFD3C3] rounded-lg px-3 py-1.5 text-xs text-[#2A1B12] placeholder-[#6E5D4F] focus:outline-none focus:ring-2 focus:ring-[#9E2A2B]"
            />
          </div>

          <ul
            id={listboxId}
            role="listbox"
            aria-label="Comunas de la Región Metropolitana"
            className="max-h-52 overflow-y-auto py-1 text-sm"
          >
            {filteredComunas.length === 0 ? (
              <li className="px-3.5 py-2.5 text-xs">
                {isKnownRuralRM(query) ? (
                  <span className="text-[#9E2A2B] font-medium leading-relaxed block">
                    Comuna fuera de la cobertura de bicimensajería (solo Gran Santiago urbano). Escríbenos a comercial@selvaalta.cl para coordinar por Starken.
                  </span>
                ) : (
                  <span className="text-[#6E5D4F]">
                    Sin coincidencias en el radio urbano de Santiago
                  </span>
                )}
              </li>
            ) : (
              filteredComunas.map((comuna, idx) => {
                const isSelected = comuna === selectedComuna;
                const isHighlighted = idx === highlightedIndex;
                return (
                  <li
                    key={comuna}
                    role="option"
                    aria-selected={isSelected}
                    onMouseEnter={() => setHighlightedIndex(idx)}
                    onClick={() => selectOption(comuna)}
                    className={`px-3.5 py-2 cursor-pointer flex items-center justify-between text-xs sm:text-sm transition-colors ${
                      isHighlighted
                        ? "bg-[#EFE4D2] text-[#143326] font-semibold"
                        : isSelected
                          ? "bg-[#F3ECE1] text-[#9E2A2B] font-semibold"
                          : "text-[#2A1B12] hover:bg-[#F3ECE1]"
                    }`}
                  >
                    <span>{comuna}</span>
                    {isSelected && (
                      <span className="font-mono text-[10px] text-[#9E2A2B]">
                        Seleccionada
                      </span>
                    )}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
