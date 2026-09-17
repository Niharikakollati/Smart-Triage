import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  Heart,
  ShieldCheck,
  PhoneCall,
  AlertTriangle,
  FileText,
  ChevronLeft,
  Save,
  Plus,
  Trash2,
  CheckCircle2,
  LogOut
} from 'lucide-react';
import { UserHealthProfile } from '../../types';

export const HealthProfileScreen: React.FC = () => {
  const { userProfile, updateUserProfile, navigateBack, logout } = useApp();

  const [formData, setFormData] = useState<UserHealthProfile>(userProfile);
  const [newAllergy, setNewAllergy] = useState('');
  const [newCondition, setNewCondition] = useState('');

  const bmi = (formData.weightKg / Math.pow(formData.heightCm / 100, 2)).toFixed(1);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(formData);
    navigateBack();
  };

  const handleAddAllergy = () => {
    if (newAllergy.trim()) {
      setFormData((prev) => ({
        ...prev,
        allergies: [...prev.allergies, newAllergy.trim()]
      }));
      setNewAllergy('');
    }
  };

  const handleRemoveAllergy = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      allergies: prev.allergies.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="flex-1 p-4 pb-24 space-y-5 animate-fadeIn">
      {/* SCREEN HEADER */}
      <div className="flex items-center justify-between">
        <button
          onClick={navigateBack}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
          <h1 className="text-sm font-bold text-white uppercase tracking-wider">
            Emergency Health Profile
          </h1>
          <p className="text-[11px] text-red-400 font-medium">Digital Medical Passport</p>
        </div>
        <div className="w-9" />
      </div>

      {/* HEALTH PASSPORT HERO CARD */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-red-500/40 p-5 shadow-xl space-y-4 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 font-black text-base">
              {formData.bloodGroup.split(' ')[0]}
            </div>
            <div>
              <h2 className="text-base font-bold text-white">{formData.name}</h2>
              <p className="text-xs text-slate-400">
                {formData.age} yrs &bull; {formData.gender} &bull; BMI: <span className="text-emerald-400 font-semibold">{bmi}</span>
              </p>
            </div>
          </div>
          <span className="text-[10px] uppercase font-mono font-bold bg-emerald-950/80 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Donor
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-xs">
          <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400">Insurance Policy:</span>
            <p className="font-mono text-slate-200 font-semibold text-[11px] mt-0.5">{formData.insurancePolicyNo}</p>
          </div>
          <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400">Height / Weight:</span>
            <p className="text-slate-200 font-semibold text-[11px] mt-0.5">{formData.heightCm} cm &bull; {formData.weightKg} kg</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-4 text-xs">
        {/* BASIC VITALS & BLOOD GROUP */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-4 space-y-3">
          <span className="font-bold text-slate-200 uppercase tracking-wider block text-xs">
            Demographics & Blood Group
          </span>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-slate-400">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2 text-white font-medium focus:outline-hidden focus:border-red-500"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400">Blood Group</label>
              <select
                value={formData.bloodGroup}
                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2 text-white focus:outline-hidden focus:border-red-500"
              >
                <option value="O+ (Positive)">O+ (Positive)</option>
                <option value="O- (Negative)">O- (Negative)</option>
                <option value="A+ (Positive)">A+ (Positive)</option>
                <option value="A- (Negative)">A- (Negative)</option>
                <option value="B+ (Positive)">B+ (Positive)</option>
                <option value="B- (Negative)">B- (Negative)</option>
                <option value="AB+ (Positive)">AB+ (Positive)</option>
                <option value="AB- (Negative)">AB- (Negative)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[11px] text-slate-400">Age</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400">Height (cm)</label>
              <input
                type="number"
                value={formData.heightCm}
                onChange={(e) => setFormData({ ...formData, heightCm: Number(e.target.value) })}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400">Weight (kg)</label>
              <input
                type="number"
                value={formData.weightKg}
                onChange={(e) => setFormData({ ...formData, weightKg: Number(e.target.value) })}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
              />
            </div>
          </div>
        </div>

        {/* ALLERGIES & MEDICATIONS */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-4 space-y-3">
          <span className="font-bold text-slate-200 uppercase tracking-wider block text-xs">
            Allergies & Contraindications
          </span>

          <div className="flex flex-wrap gap-1.5">
            {formData.allergies.map((all, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 bg-amber-950/80 text-amber-300 border border-amber-800/80 px-2.5 py-1 rounded-xl text-xs"
              >
                <span>{all}</span>
                <button type="button" onClick={() => handleRemoveAllergy(i)} className="text-amber-400 hover:text-white">
                  &times;
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add drug or food allergy (e.g. Sulfa, Latex)"
              value={newAllergy}
              onChange={(e) => setNewAllergy(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-2 text-white text-xs"
            />
            <button
              type="button"
              onClick={handleAddAllergy}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-xs border border-slate-700"
            >
              + Add
            </button>
          </div>
        </div>

        {/* EMERGENCY CONTACTS LIST */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-4 space-y-3">
          <span className="font-bold text-slate-200 uppercase tracking-wider block text-xs">
            Designated Emergency Contacts
          </span>

          <div className="space-y-2">
            {formData.emergencyContacts.map((contact, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-white">{contact.name}</span>
                    <span className="text-[10px] text-slate-400 font-medium">({contact.relationship})</span>
                    {contact.isPrimary && (
                      <span className="text-[9px] bg-red-950 text-red-300 px-1.5 py-0.2 rounded border border-red-800">Primary</span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">{contact.phone}</span>
                </div>
                <a
                  href={`tel:${contact.phone}`}
                  className="p-2 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* SAVE BUTTON */}
        <button
          type="submit"
          className="w-full py-3.5 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          <Save className="w-4 h-4" />
          <span>SAVE HEALTH PASSPORT</span>
        </button>

        {/* LOG OUT BUTTON */}
        <button
          type="button"
          onClick={logout}
          className="w-full py-3 rounded-2xl bg-rose-950/60 hover:bg-rose-900 border border-rose-800 text-rose-300 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
        >
          <LogOut className="w-4 h-4 text-rose-400" />
          <span>Log Out of Citizen Portal</span>
        </button>
      </form>
    </div>
  );
};
