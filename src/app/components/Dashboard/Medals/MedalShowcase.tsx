import React, { useEffect, useState } from "react";
import Medal from "./Medal";

interface MedalShowcaseProps {
    medals: any;
    medalsProgress: any;
    category: String
}

const MedalShowcase = ({ medals, medalsProgress, category }: MedalShowcaseProps) => {

    console.log(medals)
    console.log(medalsProgress)
     console.log(category)
    const [selectedTier, setSelectedTier] = useState('All');
    const [medalsList, setMedals] = useState(medals);

    const tierOptions = [0, 1, 2, 3, 4, 5]

    let temp = 0;

    if (!medals) {
        return (
            <div className="grid grid-rows-4 gap-4 h-full">No Medals in this Category</div>
        )
    }
    useEffect(()=>{
        if(category === 'all') {
            let temp = {}
            for(const x in medals) {
                for(const i in medals[x]) {
                    //@ts-ignore
                    temp[i] = medals[x][i];
                }
            }
            setMedals(temp);
        }
        else {
            setMedals(medals)
        }
        
    },[medals])

    return (
        <>
        <div className="w-full h-auto">
            {/* Filters */}
            <div className="grid grid-cols-3 h-12">
                <select
                    className="select select-bordered w-full max-w-xs"
                    value={selectedTier}
                    onChange={(e) => setSelectedTier(e.target.value)}
                >
                    <option key={'All'} value={'All'}>
                            {'All Tiers'}
                        </option>
                    {tierOptions.map((tier) => (
                        <option key={tier} value={tier}>
                            {'Tier ' + tier}
                        </option>
                    ))}
                </select>

                <div></div>

                {/* Total */}
                <div className="self-end justify-self-end">
                    <h2 className="text-voltage text-4xl font-bold">
                        24
                        <span className="text-ash text-2xl">/128 Total Medals</span>
                    </h2>
                </div>
            </div>

            {/* Medal Area */}
            <div>
                {
                    // @ts-ignore
                    Object.keys(medalsList).map((medal, value)=> {
                        return (
                            // @ts-ignore
                            <Medal medalInfo={medalsList[medal]} progress={medalsProgress[medal] || null} key={medal}/>
                        )
                    })
                    
                }
                
            </div>
        </div>
        </>
    );
};

export default MedalShowcase;
