import React, { useState } from 'react';
import { 
  ChevronRight, 
  X, 
  Globe, 
  Shuffle,
  HelpCircle, 
  Tag, 
  Folder, 
  Pencil, 
  ImageIcon, 
  Twitter,
  Linkedin,
  Facebook,
  Zap,
  ChevronDown,
  Check,
  Database,
  Target,
  BarChart,
  Lock,
  Clock,
  MoreHorizontal,
  CornerDownLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

/**
 * CreateProductModal Component
 * Pixel-perfect recreation of Dub.sh modal design
 */
export function CreateProductModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  register, 
  handleSubmit 
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          onClick={onClose} 
          className="absolute inset-0 bg-black/20" 
        />
        
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.15 }}
          className="relative bg-white w-full max-w-[920px] rounded-xl shadow-2xl flex flex-col overflow-hidden"
          style={{ maxHeight: 'calc(100vh - 32px)' }}
        >
          {/* Header */}
          <ModalHeader onClose={onClose} />

          {/* Body - Two Column Layout */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-[1fr,360px]">
              {/* Left Column */}
              <ModalLeftColumn register={register} />

              {/* Right Sidebar */}
              <ModalRightSidebar />
            </div>
          </div>

          {/* Footer */}
          <ModalFooter onSubmit={handleSubmit(onSubmit)} />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

/**
 * ModalHeader Component
 */
function ModalHeader({ onClose }) {
  return (
    <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-600">Links</span>
        <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
        <div className="flex items-center gap-1.5">
          <Globe className="h-4 w-4 text-gray-600" />
          <span className="font-medium text-gray-900">New link</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-gray-400 text-xs">
          <Check className="h-3.5 w-3.5" />
          <span>Draft saved</span>
        </div>
        <button 
          onClick={onClose} 
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/**
 * ModalLeftColumn Component
 */
function ModalLeftColumn({ register }) {
  return (
    <div className="px-6 py-5 space-y-5 bg-white">
      {/* Destination URL */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5">
          <label className="text-sm font-medium text-gray-700">Destination URL</label>
          <HelpCircle className="h-3.5 w-3.5 text-gray-400" />
        </div>
        <input
          {...register('name')}
          type="text"
          placeholder="https://dub.co/help/article/what-is-dub"
          className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Short Link */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Short Link</label>
          <div className="flex items-center gap-1">
            <button 
              type="button"
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <Shuffle className="h-3.5 w-3.5 text-gray-500" />
            </button>
            <button 
              type="button"
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <X className="h-3.5 w-3.5 text-gray-500" />
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          <select className="h-10 px-3 pr-8 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-no-repeat bg-right" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%239CA3AF\' d=\'M6 9L1 4h10z\'/%3E%3C/svg%3E")', backgroundPosition: 'right 0.75rem center', backgroundSize: '12px' }}>
            <option>dub.sh</option>
          </select>
          <input
            {...register('sku')}
            type="text"
            placeholder="Skok6j4"
            className="flex-1 h-10 px-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Promo Banner */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <div className="h-7 w-7 bg-white rounded-md border border-green-200 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Zap className="h-3.5 w-3.5 text-green-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-green-900">
              Claim a free <span className="font-medium">.link</span> domain, free for 1 year.{' '}
              <button className="underline hover:no-underline">Learn more</button>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="px-3 h-7 bg-white border border-green-300 rounded-md text-sm font-medium text-green-900 hover:bg-green-50 transition-colors whitespace-nowrap">
            Claim Domain
          </button>
          <button className="text-green-900/50 hover:text-green-900">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <label className="text-sm font-medium text-gray-700">Tags</label>
            <HelpCircle className="h-3.5 w-3.5 text-gray-400" />
          </div>
          <button className="text-xs font-medium text-gray-500 hover:text-gray-700">
            Manage
          </button>
        </div>
        <div className="relative">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Select tags..."
            className="w-full h-10 pl-9 pr-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Comments */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5">
          <label className="text-sm font-medium text-gray-700">Comments</label>
          <HelpCircle className="h-3.5 w-3.5 text-gray-400" />
        </div>
        <textarea
          {...register('description')}
          placeholder="Add comments"
          rows={3}
          className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Conversion Tracking */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-1.5">
          <label className="text-sm font-medium text-gray-700">Conversion Tracking</label>
          <HelpCircle className="h-3.5 w-3.5 text-gray-400" />
        </div>
        <button 
          type="button"
          className="relative w-9 h-5 bg-gray-200 rounded-full transition-colors"
        >
          <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform" />
        </button>
      </div>
    </div>
  );
}

/**
 * ModalRightSidebar Component
 */
function ModalRightSidebar() {
  return (
    <div className="bg-gray-50 border-l border-gray-200 px-6 py-5 space-y-5">
      {/* Folder */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5">
          <label className="text-sm font-medium text-gray-700">Folder</label>
          <HelpCircle className="h-3.5 w-3.5 text-gray-400" />
        </div>
        <button className="w-full h-10 px-3 bg-white border border-gray-300 rounded-lg flex items-center justify-between hover:border-gray-400 transition-colors">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-green-100 rounded flex items-center justify-center">
              <Folder className="h-2.5 w-2.5 text-green-600" />
            </div>
            <span className="text-sm font-medium text-gray-900">Links</span>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </button>
      </div>

      {/* QR Code */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5">
          <label className="text-sm font-medium text-gray-700">QR Code</label>
          <HelpCircle className="h-3.5 w-3.5 text-gray-400" />
        </div>
        <div className="relative aspect-square bg-white border border-gray-200 rounded-lg p-4 group">
          <button className="absolute top-2 right-2 p-1.5 bg-white border border-gray-200 rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
            <Pencil className="h-3.5 w-3.5 text-gray-600" />
          </button>
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* QR Code Pattern */}
            <rect x="0" y="0" width="100" height="100" fill="white"/>
            {/* Top-left corner */}
            <rect x="5" y="5" width="25" height="25" fill="black"/>
            <rect x="10" y="10" width="15" height="15" fill="white"/>
            <rect x="13" y="13" width="9" height="9" fill="black"/>
            {/* Top-right corner */}
            <rect x="70" y="5" width="25" height="25" fill="black"/>
            <rect x="75" y="10" width="15" height="15" fill="white"/>
            <rect x="78" y="13" width="9" height="9" fill="black"/>
            {/* Bottom-left corner */}
            <rect x="5" y="70" width="25" height="25" fill="black"/>
            <rect x="10" y="75" width="15" height="15" fill="white"/>
            <rect x="13" y="78" width="9" height="9" fill="black"/>
            {/* Random pattern */}
            <rect x="35" y="5" width="4" height="4" fill="black"/>
            <rect x="40" y="5" width="4" height="4" fill="black"/>
            <rect x="50" y="5" width="4" height="4" fill="black"/>
            <rect x="35" y="10" width="4" height="4" fill="black"/>
            <rect x="45" y="10" width="4" height="4" fill="black"/>
            <rect x="55" y="10" width="4" height="4" fill="black"/>
            <rect x="35" y="35" width="4" height="4" fill="black"/>
            <rect x="40" y="40" width="4" height="4" fill="black"/>
            <rect x="70" y="35" width="4" height="4" fill="black"/>
            <rect x="75" y="40" width="4" height="4" fill="black"/>
            <rect x="35" y="70" width="4" height="4" fill="black"/>
            <rect x="40" y="75" width="4" height="4" fill="black"/>
          </svg>
        </div>
      </div>

      {/* Custom Link Preview */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <label className="text-sm font-medium text-gray-700">Custom Link Preview</label>
            <HelpCircle className="h-3.5 w-3.5 text-gray-400" />
          </div>
          <button 
            type="button"
            className="relative w-9 h-5 bg-gray-200 rounded-full transition-colors"
          >
            <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform" />
          </button>
        </div>

        {/* Social Icons */}
        <div className="grid grid-cols-4 gap-1.5">
          <button className="h-9 bg-black text-white rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors">
            <Globe className="h-4 w-4" />
          </button>
          <button className="h-9 bg-white border border-gray-300 text-gray-600 rounded-lg flex items-center justify-center hover:border-gray-400 transition-colors">
            <Twitter className="h-4 w-4" />
          </button>
          <button className="h-9 bg-white border border-gray-300 text-gray-600 rounded-lg flex items-center justify-center hover:border-gray-400 transition-colors">
            <Linkedin className="h-4 w-4" />
          </button>
          <button className="h-9 bg-white border border-gray-300 text-gray-600 rounded-lg flex items-center justify-center hover:border-gray-400 transition-colors">
            <Facebook className="h-4 w-4" />
          </button>
        </div>

        {/* Preview Card */}
        <div className="relative bg-white border border-gray-200 rounded-lg overflow-hidden group">
          <button className="absolute top-2 right-2 p-1.5 bg-white border border-gray-200 rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <Pencil className="h-3.5 w-3.5 text-gray-600" />
          </button>
          <div className="h-32 bg-gray-50 border-b border-gray-100 flex items-center justify-center">
            <ImageIcon className="h-8 w-8 text-gray-300" />
          </div>
          <div className="p-3 text-center">
            <p className="text-xs text-gray-600 font-medium">Enter a link to generate</p>
            <p className="text-xs text-gray-400">a preview</p>
          </div>
        </div>

        {/* Add Title */}
        <button className="text-sm text-gray-500 hover:text-gray-700 font-medium">
          Add a title...
        </button>
      </div>
    </div>
  );
}

/**
 * ModalFooter Component
 */
function ModalFooter({ onSubmit }) {
  const footerButtons = [
    { icon: Database, label: 'UTM' },
    { icon: Target, label: 'Targeting' },
    { icon: BarChart, label: 'A/B Test' },
    { icon: Lock, label: 'Password' },
    { icon: Clock, label: 'Expiration' }
  ];

  return (
    <div className="px-6 py-3 bg-white border-t border-gray-200 flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        {footerButtons.map((btn, index) => (
          <button 
            key={index}
            type="button"
            className="flex items-center gap-1.5 h-8 px-2.5 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-colors"
          >
            <btn.icon className="h-3.5 w-3.5" />
            <span>{btn.label}</span>
          </button>
        ))}
        <button 
          type="button"
          className="h-8 w-8 bg-white border border-gray-300 rounded-lg flex items-center justify-center text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition-colors"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      <button 
        onClick={onSubmit}
        type="submit"
        className="h-9 px-4 bg-black text-white rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-gray-800 transition-colors shadow-sm"
      >
        Create link
        <CornerDownLeft className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
