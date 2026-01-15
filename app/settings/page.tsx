'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Volume2, Palette, Languages, RotateCcw, Gamepad2, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

// Define types for settings
interface SettingsState {
  soundEnabled: boolean;
  animationEnabled: boolean;
  language: 'en' | 'bn';
  theme: 'light' | 'dark';
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsState>({
    soundEnabled: true,
    animationEnabled: true,
    language: 'en',
    theme: 'dark'
  });

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('guessTheTechSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(parsedSettings);
      } catch (e) {
        console.error('Error parsing settings:', e);
      }
    }
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem('guessTheTechSettings', JSON.stringify(settings));
  }, [settings]);

  const handleSettingChange = (key: keyof SettingsState, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetSettings = () => {
    if (confirm('Are you sure you want to reset all settings to default?')) {
      const defaultSettings: SettingsState = {
        soundEnabled: true,
        animationEnabled: true,
        language: 'en',
        theme: 'dark'
      };
      setSettings(defaultSettings);
      localStorage.setItem('guessTheTechSettings', JSON.stringify(defaultSettings));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0B0F19] to-[#1A202C] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-[#E5E7EB] mb-2 flex items-center justify-center gap-3">
            <Settings className="text-[#3B82F6]" size={40} />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#3B82F6] to-[#22D3EE]">
              Settings
            </span>
          </h1>
          <p className="text-[#9CA3AF]">Customize your Guess the Tech experience</p>
        </motion.div>

        <Card className="bg-gradient-to-br from-[#111827] to-[#1F2937] border-[#3B82F6] shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-[#E5E7EB] flex items-center gap-2">
              <Gamepad2 className="text-[#3B82F6]" size={24} /> Game Settings
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={resetSettings}
              title="Reset Settings"
              className="text-[#E5E7EB] hover:bg-[#1F2937]"
            >
              <RotateCcw className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Sound Settings */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-4 rounded-xl bg-[#1F2937]/50 hover:bg-[#1F2937] transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-[#3B82F6]/10">
                  <Volume2 className="h-6 w-6 text-[#3B82F6]" />
                </div>
                <div>
                  <Label htmlFor="sound-toggle" className="text-[#E5E7EB] text-lg">Sound Effects</Label>
                  <p className="text-sm text-[#9CA3AF]">Enable or disable sound effects</p>
                </div>
              </div>
              <Switch
                id="sound-toggle"
                checked={settings.soundEnabled}
                onCheckedChange={(checked) => handleSettingChange('soundEnabled', checked)}
              />
            </motion.div>

            {/* Animation Settings */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center justify-between p-4 rounded-xl bg-[#1F2937]/50 hover:bg-[#1F2937] transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-[#22D3EE]/10">
                  <Palette className="h-6 w-6 text-[#22D3EE]" />
                </div>
                <div>
                  <Label htmlFor="animation-toggle" className="text-[#E5E7EB] text-lg">Animations</Label>
                  <p className="text-sm text-[#9CA3AF]">Enable or disable UI animations</p>
                </div>
              </div>
              <Switch
                id="animation-toggle"
                checked={settings.animationEnabled}
                onCheckedChange={(checked) => handleSettingChange('animationEnabled', checked)}
              />
            </motion.div>

            {/* Language Settings */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4 p-4 rounded-xl bg-[#1F2937]/50 hover:bg-[#1F2937] transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-[#EF4444]/10">
                  <Languages className="h-6 w-6 text-[#EF4444]" />
                </div>
                <div>
                  <Label className="text-[#E5E7EB] text-lg">Language</Label>
                  <p className="text-sm text-[#9CA3AF]">Choose your preferred language</p>
                </div>
              </div>
              <Select
                value={settings.language}
                onValueChange={(value: 'en' | 'bn') => handleSettingChange('language', value)}
              >
                <SelectTrigger className="w-full bg-[#1F2937] border-[#374151] text-[#E5E7EB] rounded-xl h-12">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent className="bg-[#1F2937] border-[#374151] text-[#E5E7EB]">
                  <SelectItem value="en" className="focus:bg-[#3B82F6]/20">English</SelectItem>
                  <SelectItem value="bn" className="focus:bg-[#3B82F6]/20">বাংলা (Bangla)</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            {/* Theme Settings */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4 p-4 rounded-xl bg-[#1F2937]/50 hover:bg-[#1F2937] transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-[#F59E0B]/10">
                  <Palette className="h-6 w-6 text-[#F59E0B]" />
                </div>
                <div>
                  <Label className="text-[#E5E7EB] text-lg">Theme</Label>
                  <p className="text-sm text-[#9CA3AF]">Choose your preferred theme</p>
                </div>
              </div>
              <Select
                value={settings.theme}
                onValueChange={(value: 'light' | 'dark') => handleSettingChange('theme', value)}
              >
                <SelectTrigger className="w-full bg-[#1F2937] border-[#374151] text-[#E5E7EB] rounded-xl h-12">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent className="bg-[#1F2937] border-[#374151] text-[#E5E7EB]">
                  <SelectItem value="dark" className="focus:bg-[#3B82F6]/20 flex items-center gap-2">
                    <Moon className="h-4 w-4" /> Dark
                  </SelectItem>
                  <SelectItem value="light" className="focus:bg-[#3B82F6]/20 flex items-center gap-2">
                    <Sun className="h-4 w-4" /> Light
                  </SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="text-[#E5E7EB] border-[#3B82F6] hover:bg-[#111827] hover:text-[#22D3EE] px-8 py-6 text-lg rounded-2xl"
          >
            Back to Game
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}