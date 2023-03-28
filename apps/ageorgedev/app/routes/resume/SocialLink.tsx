import type { Icon } from '@phosphor-icons/react';
import {
  Envelope,
  GithubLogo,
  Globe,
  LinkedinLogo,
  Phone,
} from '@phosphor-icons/react';
import React from 'react';
import { BodySm } from '@ageorgedev/atoms';

type SocialLinkType = 'github' | 'linkedin' | 'email' | 'web' | 'phone';

type SocialLinkProps = {
  type: SocialLinkType;
  full?: boolean;
};

export function SocialLink({ type, full }: SocialLinkProps) {
  const link = LINKS[type];
  const displayLink = DISPLAY_LINKS[type] ?? link;
  const Icon = ICONS[type];
  return (
    <a
      href={link}
      className="flex gap-2 align-baseline"
      target="_blank"
      rel="noreferrer"
    >
      <Icon weight="duotone" className="text-rc-p-accent-400" />
      {full && <BodySm as="span">{displayLink}</BodySm>}
    </a>
  );
}

const LINKS: Record<SocialLinkType, string> = {
  github: 'https://github.com/bassoGeorge',
  linkedin: 'https://linkedin.com/in/anishbassogeorge',
  email: 'mailto:anishgeorgehb@gmail.com',
  web: 'https://ageorge.dev',
  phone: 'tel:+91-999999',
};

const DISPLAY_LINKS: Partial<Record<SocialLinkType, string>> = {
  email: 'anishgeorgehb@gmail.com',
  phone: '+91-999999',
};

const ICONS: Record<SocialLinkType, Icon> = {
  github: GithubLogo,
  linkedin: LinkedinLogo,
  email: Envelope,
  web: Globe,
  phone: Phone,
};
