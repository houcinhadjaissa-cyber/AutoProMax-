import { useState } from 'react';
import { useAuthStore, useRoleStore, useToastStore } from '../stores';
import { Icon } from './Icon';

export function RoleSelector({ onClose }: { onClose: () => void }) {
  const { setActiveRole } = useAuthStore();
  const { allRoles, role: currentRole, setRole } = useRoleStore();
  const addToast = useToastStore((s) => s.addToast);
  const [selected, setSelected] = useState(currentRole);

  const handleConfirm = () => {
    setRole(selected); setActiveRole(selected);
    addToast(`Switched to ${allRoles.find(r => r.key === selected)?.config.label}`, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-md max-h-[80vh] overflow-auto" onClick={e => e.stopPropagation()}>
        <div className="px-5 pt-5 pb-3 border-b border-autopro-border flex items-center justify-between">
          <div><h2 className="text-base font-bold text-autopro-text">Select Account Type</h2><p className="text-xs text-autopro-text-muted mt-0.5">Each type has a different dashboard</p></div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-autopro-bg"><Icon name="x" size={20} className="text-autopro-text-muted" /></button>
        </div>
        <div className="p-4 space-y-2">
          {allRoles.map(({ key, config }) => {
            const isSelected = selected === key; const isCurrent = currentRole === key;
            return (
              <button key={key} onClick={() => setSelected(key)} className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${isSelected ? 'border-autopro-green bg-autopro-green-light' : isCurrent ? 'border-autopro-border bg-autopro-bg' : 'border-autopro-border bg-white'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl ${config.color} text-white flex items-center justify-center flex-shrink-0`}><Icon name={config.icon as any} size={22} /></div>
                  <div className="flex-1 min-w-0"><div className="flex items-center gap-2"><p className="text-sm font-bold text-autopro-text">{config.label}</p>{isCurrent && <span className="text-[9px] font-semibold bg-autopro-green text-white px-1.5 py-0.5 rounded-full">Current</span>}</div><p className="text-xs text-autopro-text-secondary mt-0.5">{config.description}</p></div>
                  {isSelected && <div className="w-6 h-6 rounded-full bg-autopro-green text-white flex items-center justify-center flex-shrink-0"><Icon name="check" size={14} /></div>}
                </div>
              </button>
            );
          })}
        </div>
        <div className="p-4 border-t border-autopro-border"><button onClick={handleConfirm} disabled={selected === currentRole} className="w-full bg-autopro-green text-white font-semibold py-3 rounded-xl text-sm disabled:opacity-40">{selected === currentRole ? 'Already Active' : 'Switch to ' + allRoles.find(r => r.key === selected)?.config.label}</button></div>
      </div>
    </div>
  );
}
