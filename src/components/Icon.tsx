import { Home, Search, ShoppingCart, MessageCircle, User, Car, Wrench, Shield, Lock, CheckCircle, Zap, ChevronRight, ChevronLeft, Plus, Minus, X, Star, MapPin, Phone, Mail, Clock, Package, Settings, Bell, Heart, Share2, Filter, ArrowRight, ArrowLeft, Menu, Camera, Upload, FileText, Truck, CreditCard, Wallet, Receipt, AlertCircle, Info, HelpCircle, Eye, EyeOff, Edit, Trash2, RefreshCw, Download, ExternalLink, Calendar, Gauge, Fuel, Cog, KeyRound, Hash, BarChart3, Users, Store, Award, TrendingUp, Check, Copy, Send, Image, Paperclip, Mic, type LucideProps } from 'lucide-react';
import type { ComponentType } from 'react';

export type IconName = 'home' | 'search' | 'cart' | 'chat' | 'user' | 'car' | 'wrench' | 'shield' | 'lock' | 'check-circle' | 'zap' | 'chevron-right' | 'chevron-left' | 'plus' | 'minus' | 'x' | 'star' | 'map-pin' | 'phone' | 'mail' | 'clock' | 'package' | 'settings' | 'bell' | 'heart' | 'share' | 'filter' | 'arrow-right' | 'arrow-left' | 'menu' | 'camera' | 'upload' | 'file' | 'truck' | 'credit-card' | 'wallet' | 'receipt' | 'alert' | 'info' | 'help' | 'eye' | 'eye-off' | 'edit' | 'trash' | 'refresh' | 'download' | 'external' | 'calendar' | 'gauge' | 'fuel' | 'cog' | 'key' | 'hash' | 'chart' | 'users' | 'store' | 'award' | 'trending' | 'check' | 'copy' | 'send' | 'image' | 'attach' | 'mic';

const iconMap: Record<IconName, ComponentType<LucideProps>> = {
  'home': Home, 'search': Search, 'cart': ShoppingCart, 'chat': MessageCircle, 'user': User,
  'car': Car, 'wrench': Wrench, 'shield': Shield, 'lock': Lock, 'check-circle': CheckCircle, 'zap': Zap,
  'chevron-right': ChevronRight, 'chevron-left': ChevronLeft, 'plus': Plus, 'minus': Minus, 'x': X,
  'star': Star, 'map-pin': MapPin, 'phone': Phone, 'mail': Mail, 'clock': Clock, 'package': Package,
  'settings': Settings, 'bell': Bell, 'heart': Heart, 'share': Share2, 'filter': Filter,
  'arrow-right': ArrowRight, 'arrow-left': ArrowLeft, 'menu': Menu, 'camera': Camera, 'upload': Upload,
  'file': FileText, 'truck': Truck, 'credit-card': CreditCard, 'wallet': Wallet, 'receipt': Receipt,
  'alert': AlertCircle, 'info': Info, 'help': HelpCircle, 'eye': Eye, 'eye-off': EyeOff,
  'edit': Edit, 'trash': Trash2, 'refresh': RefreshCw, 'download': Download, 'external': ExternalLink,
  'calendar': Calendar, 'gauge': Gauge, 'fuel': Fuel, 'cog': Cog, 'key': KeyRound, 'hash': Hash,
  'chart': BarChart3, 'users': Users, 'store': Store, 'award': Award, 'trending': TrendingUp,
  'check': Check, 'copy': Copy, 'send': Send, 'image': Image, 'attach': Paperclip, 'mic': Mic,
};

interface IconProps extends LucideProps { name: IconName; }

export function Icon({ name, size = 20, strokeWidth = 2, ...props }: IconProps) {
  const LucideIcon = iconMap[name];
  if (!LucideIcon) return null;
  return <LucideIcon size={size} strokeWidth={strokeWidth} {...props} />;
}
