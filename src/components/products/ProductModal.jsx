import React, { useState } from 'react';
import { X, ChevronRight, Package, Calculator, HelpCircle, Tag, Folder, Pencil, ImageIcon, Zap, ChevronDown, Check, Database, Target, BarChart, Lock, Clock, MoreHorizontal, CornerDownLeft, Sparkles, Hash, Box } from 'lucide-react';

/**
 * ProductModal - Highly Professional & Compact 3-Column Field Layout
 * Zero Scrolling Design with comprehensive cursor interaction states.
 */
export function ProductModal({ isOpen, onClose, onSubmit, register, handleSubmit }) {
  const [published, setPublished] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/10 backdrop-blur-[1px] transition-opacity cursor-pointer" 
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] w-full max-w-[900px] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 cursor-default" style={{ maxHeight: 'min(750px, 95vh)' }}>
        
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-2.5 border-b border-gray-100 shrink-0 bg-white">
          <div className="flex items-center gap-2 text-[12px]">
            <span className="text-gray-500 hover:text-gray-900 cursor-pointer font-medium transition-colors">Products</span>
            <ChevronRight className="h-3 w-3 text-gray-300" />
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-gray-50 rounded-md border border-gray-100 cursor-default">
              <Package className="h-3.5 w-3.5 text-black" />
              <span className="font-bold text-gray-900">New Product</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 cursor-help" title="Your progress is automatically saved as a draft">
              <Check className="h-3 w-3" />
              <span>Ready to publish</span>
            </div>
            <button 
              onClick={onClose} 
              className="p-1 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="flex-1 flex flex-row overflow-hidden">
          
          {/* MAIN FORM AREA */}
          <div className="flex-1 p-6 space-y-5 overflow-visible">
            
            {/* ROW 1 */}
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 space-y-1.5">
                <label className="text-[12px] font-bold text-gray-700 flex items-center gap-1.5 cursor-default">
                  Product Name <HelpCircle className="h-3 w-3 text-gray-300 cursor-help" />
                </label>
                <input
                  {...register('name')}
                  type="text"
                  placeholder="e.g. Arc Mouse Limited Edition"
                  className="w-full h-9 px-3 text-[13px] border border-gray-300 rounded-lg focus:ring-1 focus:ring-black outline-none shadow-sm transition-all cursor-text"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-gray-700 cursor-default">Category</label>
                <div className="relative">
                  <select className="w-full h-9 pl-3 pr-8 text-[13px] border border-gray-300 rounded-lg bg-gray-50 appearance-none outline-none focus:ring-1 focus:ring-black cursor-pointer hover:border-gray-400 transition-colors">
                    <option>Electronics</option>
                    <option>Accessories</option>
                    <option>Software</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* ROW 2 */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-gray-700 flex items-center gap-1.5 cursor-default">
                  Price ($) <Calculator className="h-3 w-3 text-gray-300 cursor-help" />
                </label>
                <input
                  {...register('price')}
                  type="number"
                  placeholder="0.00"
                  className="w-full h-9 px-3 text-[13px] border border-gray-300 rounded-lg hover:border-gray-400 focus:ring-1 focus:ring-black outline-none transition-colors cursor-text"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-gray-700 flex items-center gap-1.5 cursor-default">
                  SKU / Code <Hash className="h-3 w-3 text-gray-300 cursor-help" />
                </label>
                <input
                  {...register('sku')}
                  type="text"
                  placeholder="SKU-8821"
                  className="w-full h-9 px-3 text-[13px] border border-gray-300 rounded-lg hover:border-gray-400 focus:ring-1 focus:ring-black outline-none transition-colors cursor-text"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-gray-700 flex items-center gap-1.5 cursor-default">
                  Stock Qty <Box className="h-3 w-3 text-gray-300 cursor-help" />
                </label>
                <input
                  type="number"
                  placeholder="100"
                  className="w-full h-9 px-3 text-[13px] border border-gray-300 rounded-lg hover:border-gray-400 focus:ring-1 focus:ring-black outline-none transition-colors cursor-text"
                />
              </div>
            </div>

            {/* ROW 3 */}
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1 space-y-1.5">
                <label className="text-[12px] font-bold text-gray-700 cursor-default">Collection</label>
                <button type="button" className="w-full h-9 px-3 bg-white border border-gray-300 rounded-lg flex items-center justify-between shadow-sm hover:border-[#16a34a] transition-all group active:scale-[0.98] cursor-pointer">
                  <div className="flex items-center gap-2.5 pointer-events-none">
                    <div className="h-5 w-5 bg-[#e8f5e9] rounded flex items-center justify-center transition-colors group-hover:bg-[#c8e6c9]">
                      <Folder className="h-3.5 w-3.5 text-[#16a34a]" fill="currentColor" />
                    </div>
                    <span className="text-[13px] font-semibold text-gray-900 text-left">General</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400 transition-transform group-hover:rotate-180" />
                </button>
              </div>
              <div className="col-span-2 space-y-1.5">
                <label className="text-[12px] font-bold text-gray-700 cursor-default">Tags</label>
                <div className="relative group">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Minimalist, Desk, Tech..."
                    className="w-full h-9 pl-9 pr-3 text-[13px] border border-gray-300 rounded-lg focus:ring-1 focus:ring-black outline-none transition-all cursor-text"
                  />
                </div>
              </div>
            </div>

            {/* ROW 4 */}
            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-gray-700 cursor-default">Product Description</label>
              <textarea
                {...register('description')}
                placeholder="Briefly describe the product features..."
                rows={3}
                className="w-full px-3 py-2 text-[13px] border border-gray-300 rounded-lg focus:ring-1 focus:ring-black outline-none resize-none transition-all shadow-sm font-sans cursor-text"
              />
            </div>

            {/* STATUS & PROMO AREA */}
            <div className="flex items-center justify-between gap-4 pt-1">
              <div className="flex-1 bg-[#F0FDF4] border border-[#BBF7D0] rounded-lg p-2.5 flex items-center justify-between cursor-default">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 bg-white rounded-md border border-[#BBF7D0] shadow-sm flex items-center justify-center">
                    <Zap className="h-3.5 w-3.5 text-[#22C55E]" fill="currentColor" />
                  </div>
                  <span className="text-[11px] font-bold text-[#166534] uppercase tracking-tight">Express Delivery Eligible</span>
                </div>
                <button type="button" className="text-[11px] font-bold text-[#166534] underline underline-offset-2 cursor-pointer hover:text-green-800 transition-colors">Invite Only</button>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 border border-gray-100 rounded-lg bg-gray-50/50 cursor-default">
                <span className="text-[12px] font-bold text-gray-700">Live Status:</span>
                <button 
                  type="button" 
                  onClick={() => setPublished(!published)}
                  className={`relative w-8 h-4.5 rounded-full transition-all duration-300 cursor-pointer ${published ? 'bg-black shadow-lg shadow-black/10' : 'bg-gray-200'}`}
                >
                  <div className={`absolute top-0.5 left-0.5 w-3.5 h-3.5 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${published ? 'translate-x-3.5' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT SIDEBAR */}
          <div className="w-[280px] bg-[#fafafa] border-l border-gray-100 flex flex-col p-6 space-y-6 shrink-0 cursor-default">
            
            {/* Image Preview Area */}
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-gray-700">Media Assets</label>
              <div className="relative aspect-square bg-white border-2 border-dashed border-gray-200 rounded-xl overflow-hidden shadow-sm hover:border-black group cursor-pointer transition-all">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 group-hover:bg-gray-50 transition-colors">
                  <div className="h-10 w-10 bg-gray-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ImageIcon className="h-5 w-5 text-gray-400 group-hover:text-black" />
                  </div>
                  <span className="text-[11px] font-semibold text-gray-400 group-hover:text-black">Upload Product Art</span>
                </div>
              </div>
            </div>

            {/* Mini Store Mockup */}
            <div className="space-y-3">
              <label className="text-[12px] font-bold text-gray-700 flex items-center justify-between cursor-default">
                <span>Market Preview</span>
                <Sparkles className="h-3 w-3 text-amber-500" />
              </label>
              <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm space-y-2.5 relative group hover:shadow-md transition-shadow cursor-help">
                <div className="absolute -top-2 -right-2 bg-black text-white px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider shadow-lg">Live</div>
                <div className="h-24 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100 group-hover:bg-gray-100 transition-colors">
                  <Package className="h-6 w-6 text-gray-200" />
                </div>
                <div className="space-y-1.5">
                  <div className="h-2.5 w-3/4 bg-gray-100 rounded-full" />
                  <div className="h-2 w-1/2 bg-gray-50 rounded-full" />
                  <div className="flex items-center justify-between pt-1">
                    <div className="h-3.5 w-10 bg-black/5 rounded-full" />
                    <div className="h-3.5 w-3.5 bg-black/5 rounded-full" />
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-gray-400 leading-tight text-center">How your product will look in the marketplace.</p>
              <button type="button" className="w-full text-[11px] font-bold text-gray-500 hover:text-black transition-colors cursor-pointer py-1 ring-1 ring-transparent hover:ring-gray-200 rounded-md">View details...</button>
            </div>

          </div>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-3 bg-white border-t border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5">
            {['Analytics', 'SEO', 'History'].map((btn) => (
              <button key={btn} type="button" className="flex items-center gap-2 h-8 px-3 bg-white border border-gray-200 rounded-lg text-[11px] font-bold text-gray-600 hover:border-black hover:text-black hover:shadow-sm transition-all shadow-sm cursor-pointer active:scale-95">
                <span>{btn}</span>
              </button>
            ))}
            <button type="button" className="h-8 w-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-400 hover:text-black transition-all shadow-sm cursor-pointer active:scale-95">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              type="button" 
              className="text-[13px] font-bold text-gray-500 hover:text-black transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit(onSubmit)}
              type="submit"
              className="px-6 h-10 bg-black text-white rounded-lg text-[14px] font-bold flex items-center gap-2 hover:bg-gray-800 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.2)] active:scale-95 group cursor-pointer"
            >
              <span>Create Product</span>
              <CornerDownLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
