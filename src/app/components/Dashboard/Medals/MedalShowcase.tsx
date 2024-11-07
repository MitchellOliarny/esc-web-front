import React, { useEffect, useState } from "react";
import Medal from "./Medal";

interface MedalShowcaseProps {
    medals: any;
    medalsProgress: any;
    category: String
}

const MedalShowcase = ({ medals, medalsProgress, category }: MedalShowcaseProps) => {


    const [selectedTier, setSelectedTier] = useState(-1);
    const [medalsList, setMedals] = useState({});
    const [totalEarned, setTotalEarned] = useState(0);

    const tierOptions = [0, 1, 2, 3, 4, 5]

    let temp = 0;


    useEffect(() => {
        ResetPage();
    }, [medals])
    
    const ResetPage = () => {
        let count = 0;
        if(selectedTier !== -1) {
            FilterSelected(selectedTier)
        }else {
            setMedals(medals);
        }
        for (const i in medals) {
            if (medalsProgress[i] && medalsProgress[i].tiers[4].isComplete) {
                count++;
            }
        }
        setTotalEarned(count);
    }

    const FilterSelected = (tier: number) => {
        let temp = {};

        if (tier == -1) {
            ResetPage();
            return;
        }

        if (tier > 0) {
            for (const x in medalsProgress) {
                if (medalsProgress[x].tiers[tier - 1] && medalsProgress[x].tiers[tier - 1].isComplete) {
                    //@ts-ignore
                    temp[x] = medals[x];
                }
            }
            setMedals(temp);
        }
        else if (tier == 0) {
            for (const x in medalsProgress) {
                if (medalsProgress[x].tiers[0] && !medalsProgress[x].tiers[0].isComplete) {
                    //@ts-ignore
                    temp[x] = medals[x];
                }
            }
            setMedals(temp);
        }
        else {
            ResetPage();
            return;
        }


    }

    if (!medals) {
        return (
            <div className="grid grid-rows-4 gap-4 h-full">No Medals in this Category</div>
        )
    }

    return (
        <>
            <div className="w-full h-auto">
                {/* Filters */}
                <div className="grid grid-cols-3 h-12">
                    <select
                        className="select select-bordered filter-item-select w-full max-w-xs"
                        value={selectedTier}
                        onChange={(e) => { setSelectedTier(Number(e.target.value)); FilterSelected(Number(e.target.value)); }}
                    >
                        <option key={'All'} value={-1}>
                            {'All Tiers'}
                        </option>
                        {tierOptions.map((tier) => (
                            <option key={tier} value={tier}>
                                {'Tier ' + tier + ' Complete'}
                            </option>
                        ))}
                    </select>

                    <div></div>

                    {/* Total */}
                    <div className="self-end justify-self-end">
                        <h2 className="text-voltage text-4xl font-bold">
                            {totalEarned}
                            <span className="text-ash text-2xl">/{Object.keys(medalsList).length}  Medals Earned</span>
                        </h2>
                    </div>
                </div>

                {/* Medal Area */}
                <div>
                    {
                        // @ts-ignore
                        Object.keys(medalsList).map((medal, value) => {
                            return (
                                // @ts-ignore
                                <Medal medalInfo={medalsList[medal]} progress={medalsProgress[medal] || { progress: 0 }} key={medal} />
                            )
                        })

                    }

                </div>
            </div>
        </>
    );
};

export default MedalShowcase;
