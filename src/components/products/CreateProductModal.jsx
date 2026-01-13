import React from 'react';
import { 
  ChevronRight, 
  X, 
  Globe, 
  Plus, 
  HelpCircle, 
  Tags, 
  Folder, 
  QrCode, 
  Pencil, 
  ImageIcon, 
  Share2, 
  BarChart, 
  Database, 
  Target, 
  Lock, 
  Clock, 
  MoreHorizontal, 
  CornerDownLeft,
  Zap,
  ChevronDown,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

/**
 * CreateProductModal Component
 * Modal for creating new products with a Dub.sh-inspired design
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
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 p-6 pointer-events-none">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          onClick={onClose} 
          className="absolute inset-0 pointer-events-auto" 
        />
        
        {/* Modal */}
        <motion.div
          layoutId="product-modal"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          className="relative bg-white w-full max-w-[980px] max-h-[90vh] rounded-2xl shadow-2xl flex flex-col pointer-events-auto overflow-hidden"
        >
          {/* Header */}
          <ModalHeader onClose={onClose} />

          {/* Body - Two Column Layout */}
          <div className="flex-1 overflow-y-auto bg-white min-h-0">
            <div className="grid grid-cols-[1fr,320px]">
              {/* Left Column - Main Form */}
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
 * Header section of the modal with breadcrumb and close button
 */
function ModalHeader({ onClose }) {
  return (
    <div className="flex items-center justify-between px-6 py-3.5 shrink-0 border-b border-gray-100">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-500">Links</span>
        <ChevronRight className="h-3.5 w-3.5 text-gray-300" />
        <div className="flex items-center gap-1.5">
          <Globe className="h-4 w-4 text-gray-500" />
          <span className="font-semibold text-gray-900">New link</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-gray-400 text-xs">
          <Check className="h-3.5 w-3.5" />
          <span>Draft saved</span>
        </div>
        <button onClick={onClose} className="text-gray-300 hover:text-gray-600">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/**
 * ModalLeftColumn Component
 * Left column containing main form fields
 */
function ModalLeftColumn({ register }) {
  return (
    <div className="p-6 space-y-5">
      {/* Destination URL */}
      <FormField
        label="Destination URL"
        showHelp
        input={
          <Input 
            {...register('name')}
            placeholder="https://dub.co/help/article/what-is-dub"
            className="h-10 border-gray-300 rounded-lg text-sm"
          />
        }
      />

      {/* Short Link */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-gray-700">Short Link</Label>
          <div className="flex items-center gap-1.5">
            <button className="p-1 hover:bg-gray-100 rounded">
              <Plus className="h-3.5 w-3.5 text-gray-400" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <X className="h-3.5 w-3.5 text-gray-400" />
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          <select className="h-10 px-3 border border-gray-300 rounded-lg text-sm bg-white w-32">
            <option>dub.sh</option>
          </select>
          <Input 
            {...register('sku')}
            placeholder="WOeeprG"
            className="h-10 border-gray-300 rounded-lg text-sm flex-1"
          />
        </div>
      </div>

      {/* Promo Banner */}
      <PromoBanner />

      {/* Tags */}
      <FormField
        label="Tags"
        showHelp
        showManage
        input={
          <div className="relative">
            <Tags className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Select tags..." className="h-10 pl-10 border-gray-300 rounded-lg text-sm" />
          </div>
        }
      />

      {/* Comments */}
      <FormField
        label="Comments"
        showHelp
        input={
          <textarea 
            {...register('description')}
            placeholder="Add comments"
            className="w-full h-24 p-3 border border-gray-300 rounded-lg text-sm resize-none"
          />
        }
      />

      {/* Conversion Tracking Toggle */}
      <ToggleField label="Conversion Tracking" />
    </div>
  );
}

/**
 * ModalRightSidebar Component
 * Right sidebar with folder, QR code, and preview options
 */
function ModalRightSidebar() {
  return (
    <div className="bg-gray-50 border-l border-gray-200 p-6 space-y-6">
      {/* Folder */}
      <FormField
        label="Folder"
        showHelp
        input={
          <div className="h-10 bg-white border border-gray-300 rounded-lg flex items-center justify-between px-3 cursor-pointer hover:border-gray-400">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-green-100 rounded flex items-center justify-center">
                <Folder className="h-3 w-3 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">Links</span>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        }
      />

      {/* QR Code */}
      <FormField
        label="QR Code"
        showHelp
        input={
          <div className="aspect-square bg-white border border-gray-200 rounded-lg flex items-center justify-center relative group p-4">
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100">
              <button className="p-1.5 rounded-md bg-white border border-gray-200 text-gray-500 hover:text-gray-900 shadow-sm">
                <Pencil className="h-3.5 w-3.5" />
              </button>
            </div>
            <QrCode className="h-full w-full text-gray-900" />
          </div>
        }
      />

      {/* Custom Link Preview */}
      <LinkPreviewSection />
    </div>
  );
}

/**
 * ModalFooter Component
 * Footer with action buttons
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
    <div className="shrink-0 px-6 py-3.5 bg-white border-t border-gray-100 flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        {footerButtons.map((btn, index) => (
          <button 
            key={index} 
            className="flex items-center gap-1.5 h-8 px-2.5 rounded-lg border border-gray-300 bg-white text-xs font-medium text-gray-700 hover:border-gray-400"
          >
            <btn.icon className="h-3.5 w-3.5" />
            <span>{btn.label}</span>
          </button>
        ))}
        <button className="h-8 w-8 border border-gray-300 rounded-lg flex items-center justify-center text-gray-500 hover:border-gray-400">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      <button 
        onClick={onSubmit}
        className="h-9 px-5 bg-black text-white rounded-lg font-semibold text-sm flex items-center gap-2 hover:bg-gray-800 shadow-lg"
      >
        Create link
        <CornerDownLeft className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

/**
 * FormField Component
 * Reusable form field with label and optional help icon
 */
function FormField({ label, showHelp, showManage, input }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Label className="text-sm font-medium text-gray-700">{label}</Label>
          {showHelp && <HelpCircle className="h-3.5 w-3.5 text-gray-400" />}
        </div>
        {showManage && (
          <button className="text-xs font-medium text-gray-500 hover:text-gray-900">
            Manage
          </button>
        )}
      </div>
      {input}
    </div>
  );
}

/**
 * ToggleField Component
 * Toggle switch field
 */
function ToggleField({ label }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-1.5">
        <Label className="text-sm font-medium text-gray-700">{label}</Label>
        <HelpCircle className="h-3.5 w-3.5 text-gray-400" />
      </div>
      <div className="h-5 w-9 bg-gray-200 rounded-full p-0.5 cursor-pointer">
        <div className="h-4 w-4 bg-white rounded-full shadow-sm" />
      </div>
    </div>
  );
}

/**
 * PromoBanner Component
 * Promotional banner for domain claim
 */
function PromoBanner() {
  return (
    <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-lg px-3.5 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 bg-white rounded-lg border border-[#bbf7d0] flex items-center justify-center">
          <Zap className="h-4 w-4 text-[#22c55e]" />
        </div>
        <div>
          <p className="text-sm font-medium text-[#166534]">
            Claim a free .link domain, free for 1 year.{' '}
            <span className="underline cursor-pointer">Learn more</span>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="px-3 py-1.5 bg-white border border-[#bbf7d0] rounded-lg text-sm font-medium text-[#166534] hover:bg-[#dcfce7]">
          Claim Domain
        </button>
        <X className="h-4 w-4 text-[#166534]/40 cursor-pointer" />
      </div>
    </div>
  );
}

/**
 * LinkPreviewSection Component
 * Custom link preview with social icons
 */
function LinkPreviewSection() {
  const socialIcons = [Globe, ImageIcon, Share2, BarChart];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Label className="text-sm font-medium text-gray-700">Custom Link Preview</Label>
          <HelpCircle className="h-3.5 w-3.5 text-gray-400" />
        </div>
        <div className="h-5 w-9 bg-gray-200 rounded-full p-0.5">
          <div className="h-4 w-4 bg-white rounded-full" />
        </div>
      </div>
      
      {/* Social Icons */}
      <div className="grid grid-cols-4 gap-1.5">
        {socialIcons.map((Icon, index) => (
          <button 
            key={index} 
            className={cn(
              "h-9 rounded-lg border flex items-center justify-center",
              index === 0 
                ? "bg-black text-white border-black" 
                : "bg-white text-gray-500 border-gray-300 hover:border-gray-400"
            )}
          >
            <Icon className="h-4 w-4" />
          </button>
        ))}
      </div>

      {/* Preview Card */}
      <div className="aspect-[4/3] bg-white border border-gray-200 rounded-lg overflow-hidden relative group">
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 z-10">
          <button className="p-1.5 rounded-md bg-white border border-gray-200 text-gray-500 hover:text-gray-900 shadow-sm">
            <Pencil className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="h-2/3 bg-gray-50 flex items-center justify-center border-b border-gray-100">
          <ImageIcon className="h-8 w-8 text-gray-300" />
        </div>
        <div className="p-3 text-center">
          <p className="text-xs text-gray-500 font-medium">Enter a link to generate</p>
          <p className="text-xs text-gray-400">a preview</p>
        </div>
      </div>

      <button className="text-sm text-gray-500 hover:text-gray-900 font-medium">
        Add a title...
      </button>
    </div>
  );
}
