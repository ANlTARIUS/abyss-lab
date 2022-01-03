/** @jsxImportSource theme-ui */
import { Box, Card, Heading, Paragraph } from '@theme-ui/components'
import { NextPageContext } from 'next'
import SquareImageBox from '../../../components/atoms/SquareImageBox'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import Honkai3rdNavigator from '../../../components/organisms/Honkai3rdNavigator'
import { WeaponData } from '../../../lib/honkai3rd/weapons'
import { getI18NProps } from '../../../lib/i18n'
import { capitalize } from '../../../lib/string'
import {
  getWeaponById,
  listWeapons,
} from '../../../server/data/honkai3rd/weapons'

interface WeaponShowPageProps {
  weapon: WeaponData
}

const WeaponShowPage = ({ weapon }: WeaponShowPageProps) => {
  return (
    <Box>
      <Honkai3rdNavigator />

      <Box p={3}>
        <Breadcrumb
          items={[
            { href: '/honkai3rd', label: 'Honkai 3rd' },
            { href: '/honkai3rd/weapons', label: 'Weapons' },
            {
              href: `/honkai3rd/weapons/${weapon.id}`,
              label: weapon.name,
            },
          ]}
        />

        <Heading as='h1'>{weapon.name}</Heading>

        <Box mb={3}>
          <SquareImageBox
            size={100}
            alt={weapon.name}
            src={`/assets/honkai3rd/weapons/${weapon.id}.png`}
          />
        </Box>

        <Card mb={3}>
          <Box p={2} sx={{ borderBottom: 'default' }}>
            {capitalize(weapon.category)}
          </Box>
          <Box p={2} sx={{ borderBottom: 'default' }}>
            {'⭐'.repeat(weapon.rarity)}
          </Box>
          <Box p={2}>
            ATK : {weapon.atk} / CRT : {weapon.crt}
          </Box>
        </Card>

        <Box>
          {weapon.skills.map((skill) => {
            return (
              <Card key={skill.name} mb={3}>
                <Heading as='h3' p={2} m={0} sx={{ borderBottom: 'default' }}>
                  {skill.name}
                </Heading>
                <Paragraph
                  p={2}
                  sx={{
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {skill.description}
                </Paragraph>
              </Card>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}

export default WeaponShowPage

export async function getStaticProps({
  params,
  locale,
}: NextPageContext & { params: { weaponId: string } }) {
  const weapon = getWeaponById(params.weaponId)

  return {
    props: { weapon, ...(await getI18NProps(locale)) },
  }
}

export async function getStaticPaths() {
  return {
    paths: listWeapons().map((weapon) => {
      return {
        params: { weaponId: weapon.id },
      }
    }),
    fallback: false,
  }
}
