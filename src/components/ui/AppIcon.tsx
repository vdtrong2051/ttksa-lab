import {
  Activity,
  Atom,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Cloud,
  Cog,
  Flame,
  FlaskConical,
  Gauge,
  GraduationCap,
  Home,
  LogIn,
  Magnet,
  Menu,
  Microscope,
  Orbit,
  Radio,
  Rocket,
  Snowflake,
  Thermometer,
  User,
  UserPlus,
  Waves,
  X,
  Zap,
} from 'lucide-react'

import type {
  AppIconName,
} from '../../types/icon'

const iconMap: Record<
  AppIconName,
  typeof Activity
> = {
  activity: Activity,
  atom: Atom,
  'book-open': BookOpen,
  'chevron-down': ChevronDown,
  'chevron-right': ChevronRight,
  close: X,
  cloud: Cloud,
  cog: Cog,
  flame: Flame,
  flask: FlaskConical,
  gauge: Gauge,
  'graduation-cap': GraduationCap,
  home: Home,
  login: LogIn,
  magnet: Magnet,
  menu: Menu,
  microscope: Microscope,
  orbit: Orbit,
  radio: Radio,
  register: UserPlus,
  rocket: Rocket,
  snowflake: Snowflake,
  thermometer: Thermometer,
  user: User,
  waves: Waves,
  zap: Zap,
}

interface AppIconProps {
  name: AppIconName
  size?: number
  strokeWidth?: number
  className?: string
  label?: string
}

export default function AppIcon({
  name,
  size = 20,
  strokeWidth = 2,
  className,
  label,
}: AppIconProps) {
  const Icon =
    iconMap[name]

  return (
    <Icon
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden={
        label ? undefined : true
      }
      aria-label={label}
      role={
        label ? 'img' : undefined
      }
    />
  )
}