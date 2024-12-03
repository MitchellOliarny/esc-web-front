import React, { useEffect, useState } from "react";
import Medal from "./Medal";
import MedalWithChildren from "./MedalWithChildren";

interface MedalShowcaseProps {
    medals: any;
    medalsProgress: any;
    category: String
    parentList: any;
    change_display_medal: any;
}

const MedalShowcase = ({ medals, medalsProgress, category, parentList, change_display_medal }: MedalShowcaseProps) => {


    const [selectedTier, setSelectedTier] = useState(-1);
    const [medalsList, setMedals] = useState({});
    const [totalEarned, setTotalEarned] = useState(0);

    const tierOptions = [1, 2, 3, 4, 5]

    let temp = 0;


    useEffect(() => {
        FilterSelected(selectedTier);
    }, [medals])
    
    const ResetPage = () => {
        setMedals(medals);
        FindTotalEarned(medals);
    }

    const FilterSelected = (tier: number) => {
        console.log(tier)
        let temp = {};

        if (tier > 0) {
            for (const x in medalsProgress) {
                if (medals[x] && medalsProgress[x].tiers[tier - 1] && medalsProgress[x].tiers[tier - 1].isComplete && (!medalsProgress[x].tiers[tier] || !medalsProgress[x].tiers[tier].isComplete)) {
                    //@ts-ignore
                    temp[x] = medals[x];
                }
            }
            setMedals(temp);
        }
        else if (tier == 0) {
            for (const x in medalsProgress) {
                if (medals[x] && medalsProgress[x].tiers[0] && !medalsProgress[x].tiers[0].isComplete) {
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

        console.log(temp)

        FindTotalEarned(temp);


    }

    const FindTotalEarned = (medalList: any) => {
        let count = 0;
        for (const i in medalList) {
            if (medalsProgress[i] && medalsProgress[i].tiers[4].isComplete) {
                count++;
            }
        }
        setTotalEarned(count);
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
                        onChange={(e) => {setSelectedTier(Number(e.target.value)); FilterSelected(Number(e.target.value)); }}
                    >
                        <option key={'All'} value={-1}>
                            {'All Tiers'}
                        </option>
                        <option key={0} value={0}>
                            {'Incomplete'}
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
                            if(parentList[medal]){
                                return (
                                    // @ts-ignore
                                    <MedalWithChildren medalInfo={medalsList[medal]} progress={medalsProgress[medal] || { progress: 0 }} key={medal} children_medals={parentList[medal]} all_children={parentList} child_progress={medalsProgress} change_display_medal={change_display_medal}/>
                                )
                            }
                        
                            return (
                                // @ts-ignore
                                <Medal medalInfo={medalsList[medal]} progress={medalsProgress[medal] || { progress: 0 }} key={medal} change_display_medal={change_display_medal} />
                            )
                        })

                    }

                </div>
            </div>
        </>
    );
};

export default MedalShowcase;
