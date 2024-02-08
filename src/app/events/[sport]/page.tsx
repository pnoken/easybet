'use client'
import { useParams } from 'next/navigation'
import { useGames, Game_OrderBy } from '@azuro-org/sdk'
import { GameCard } from '@/components'


const useData = () => {
    const params = useParams<{ sport: string }>()

    const props =
        params.sport === 'top'
            ? {
                orderBy: Game_OrderBy.Turnover,
                filter: {
                    limit: 6,
                },
            }
            : {
                filter: {
                    sportSlug: params.sport,
                },
            }

    return useGames(props)
}

export function EventsPage() {
    const { loading, data } = useData()

    return (
        <>
            {
                loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {
                            data?.games.map((game) => (
                                <GameCard key={game.id} game={game} />
                            ))
                        }
                    </div>
                )
            }
        </>
    )
}