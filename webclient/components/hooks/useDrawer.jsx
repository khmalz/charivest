"use client";

import { createContext, useContext, useState, useCallback } from "react";

const DrawerContext = createContext();

export const DrawerProvider = ({ children }) => {
   const [isOpen, setIsOpen] = useState(false);

   const toggleDrawer = useCallback(state => {
      if (typeof state === "boolean") {
         setIsOpen(state);
      } else {
         setIsOpen(prev => !prev);
      }
   }, []);

   return <DrawerContext.Provider value={{ isOpen, toggleDrawer }}>{children}</DrawerContext.Provider>;
};

export const useDrawer = () => {
   const context = useContext(DrawerContext);
   if (!context) {
      throw new Error("useDrawer harus digunakan di dalam DrawerProvider");
   }
   return context;
};
