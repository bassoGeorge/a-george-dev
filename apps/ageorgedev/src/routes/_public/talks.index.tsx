import { TiltCard } from '@ageorgedev/design-system/cards/TiltCard'
import {
  Body,
  BodyXl,
  Heading1,
  Heading2,
} from '@ageorgedev/design-system/typography/typography-components'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/talks/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="px-4 py-6">
      <Heading1 className="text-neutral-strong text-center font-bold">
        Talks
      </Heading1>
      <div className="mx-auto mt-6 flex max-w-5xl flex-col gap-3">
        <Link to="/talks/tailwind">
          <TiltCard interactive={true} shape="trapRight" className="bg-page-2">
            <Heading2 className="text-neutral-strong">
              Tailwind beyond Production
            </Heading2>
            <BodyXl className="mt-2">
              Practical strategies for building production applications with
              Tailwind CSS. Managing scale, complexity and copy-paste-ability.
            </BodyXl>

            <Body className="text-neutral-subdued mt-5 text-right">
              <em>Unfold UI | Thoughtworks | 2023</em>
            </Body>
          </TiltCard>
        </Link>
      </div>
    </div>
  )
}
