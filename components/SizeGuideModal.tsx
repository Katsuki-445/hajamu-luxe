"use client";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SizeGuideModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white p-8 rounded-2xl shadow-2xl z-50 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif font-bold">Size Guide</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="font-semibold text-lg mb-4">Smocks & Tunics</h3>
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 rounded-l-lg">Size</th>
                      <th className="px-4 py-3">Chest (inches)</th>
                      <th className="px-4 py-3">Length (inches)</th>
                      <th className="px-4 py-3 rounded-r-lg">Shoulder</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr><td className="px-4 py-3 font-medium">S</td><td className="px-4 py-3">38-40</td><td className="px-4 py-3">28</td><td className="px-4 py-3">17</td></tr>
                    <tr><td className="px-4 py-3 font-medium">M</td><td className="px-4 py-3">40-42</td><td className="px-4 py-3">29</td><td className="px-4 py-3">18</td></tr>
                    <tr><td className="px-4 py-3 font-medium">L</td><td className="px-4 py-3">42-44</td><td className="px-4 py-3">30</td><td className="px-4 py-3">19</td></tr>
                    <tr><td className="px-4 py-3 font-medium">XL</td><td className="px-4 py-3">44-46</td><td className="px-4 py-3">31</td><td className="px-4 py-3">20</td></tr>
                  </tbody>
                </table>
              </div>
              
              <div className="bg-stone-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">How to Measure</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li><strong>Chest:</strong> Measure around the fullest part of your chest.</li>
                  <li><strong>Length:</strong> Measure from the highest point of the shoulder down.</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
