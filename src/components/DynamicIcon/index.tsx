import React from 'react';
import {
  QrCode,
  Wrench,
  ArrowLeftRight,
  ShieldCheck,
  Sparkles,
  BarChart3,
  Map,
  Smartphone,
  Bell,
  KeyRound,
  ClipboardList,
  Users,
  RefreshCw,
  MapPin,
  BrainCircuit,
  type LucideProps,
} from 'lucide-react';

const registry = {
  QrCode,
  Wrench,
  ArrowLeftRight,
  ShieldCheck,
  Sparkles,
  BarChart3,
  Map,
  Smartphone,
  Bell,
  KeyRound,
  ClipboardList,
  Users,
  RefreshCw,
  MapPin,
  BrainCircuit,
};

export type IconName = keyof typeof registry;

type Props = LucideProps & {
  name: IconName;
};

export default function DynamicIcon({name, ...rest}: Props): React.ReactElement {
  const Icon = registry[name];
  return <Icon {...rest} />;
}
