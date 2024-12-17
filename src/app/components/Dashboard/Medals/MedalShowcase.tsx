import React, { useEffect, useState } from "react";
import Medal from "./Medal";
import MedalWithChildren from "./MedalWithChildren";
import Switch from "react-switch";

interface MedalShowcaseProps {
    medals: any;
    medalsProgress: any;
    category: String
    parentList: any;
    change_display_medal: any;
    isPremiumUser: boolean
}

const MedalShowcase = ({ medals, medalsProgress, category, parentList, change_display_medal, isPremiumUser }: MedalShowcaseProps) => {


    const [selectedTier, setSelectedTier] = useState(-1);
    const [selectedTerm, setSelectedTerm] = useState('');
    const [showPremium, setShowPremium] = useState(true);
    const [medalsList, setMedals] = useState([]);
    const [totalEarned, setTotalEarned] = useState(0);

    const tierOptions = [1, 2, 3, 4, 5];
    const [subjects, setSubjects] = useState([]);

    let temp = 0;

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        FilterSelected(selectedTier, selectedTerm, showPremium);
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
          };
      
          window.addEventListener('resize', handleResize);
      
          // Cleanup the event listener on component unmount
          return () => window.removeEventListener('resize', handleResize);
    }, [medals])

    const ResetPage = () => {
        let temp = [];
        let subjectTemp = [String];
        for (const x in medals) {
            medals[x].progress = medalsProgress[x] ? medalsProgress[x].progress : 0;
            temp.push(medals[x]);
            try {
                if (!subjectTemp.includes(medals[x].terms.subject)) {
                    if (medals[x].terms.subject) {
                        subjectTemp.push(medals[x].terms.subject)
                    }
                }
            }
            catch {

            }
        }
        //@ts-ignore
        setSubjects(subjectTemp);
        SortNewFirstThenProgress(temp);
        setShowPremium(true);
        //@ts-ignore
        setMedals(temp);
        FindTotalEarned(medals);
    }

    const isWithinAWeek = (date: any) => {
        return (new Date(date).getTime() + (7 * 24 * 60 * 60 * 1000)) > Date.now();
    };

    const SortNewFirstThenProgress = (data: any) => {
        data.sort((a: any, b: any) => {
            const aIsWithinAWeek = isWithinAWeek(a.date);
            const bIsWithinAWeek = isWithinAWeek(b.date);

            if (aIsWithinAWeek && !bIsWithinAWeek) return -1;
            if (!aIsWithinAWeek && bIsWithinAWeek) return 1;

            // If both are within a week or neither, sort by progress (descending)
            return b.progress - a.progress;
        });
    }

    const FilterSelected = (tier: number, subject: string, premium: boolean) => {

        let temp = [];

        if (tier > 0) {
            for (const x in medalsProgress) {
                console.log(medals[x])
                if (medals[x] && medalsProgress[x].tiers[tier - 1] && medalsProgress[x].tiers[tier - 1].isComplete && (!medalsProgress[x].tiers[tier] || !medalsProgress[x].tiers[tier].isComplete)) {
                    if (medals[x].terms.subject && (subject == '' || medals[x].terms.subject == subject)) {
                        if(!premium && medals[x].isPremium == 1) {
                            continue;
                        }
                        medals[x].progress = medalsProgress[x] ? medalsProgress[x].progress : 0;
                        //@ts-ignore
                        temp.push(medals[x]);
                    }
                }
            }
            SortNewFirstThenProgress(temp)
            //@ts-ignore
            setMedals(temp);
        }
        else if (tier == 0) {
            for (const x in medalsProgress) {
                if (medals[x] && medalsProgress[x].tiers[0] && !medalsProgress[x].tiers[0].isComplete) {
                    if (medals[x].terms.subject && (subject == '' || medals[x].terms.subject == subject)) {
                        if(!premium && medals[x].isPremium == 1) {
                            continue;
                        }
                        medals[x].progress = medalsProgress[x] ? medalsProgress[x].progress : 0;
                        //@ts-ignore
                        temp.push(medals[x]);
                    }
                }
            }
            SortNewFirstThenProgress(temp)
            //@ts-ignore
            setMedals(temp);
        }
        else if (subject) {
            for (const x in medals) {
                if (medals[x].terms.subject && (subject == '' || medals[x].terms.subject == subject)) {
                    if(!premium && medals[x].isPremium == 1) {
                        continue;
                    }
                    medals[x].progress = medalsProgress[x] ? medalsProgress[x].progress : 0;
                    //@ts-ignore
                    temp.push(medals[x]);
                }
            }
            SortNewFirstThenProgress(temp)
            //@ts-ignore
            setMedals(temp);
        }
        else if(!premium) {
            for (const x in medals) {
                    if(!premium && medals[x].isPremium == 1) {
                        continue;
                    }
                    medals[x].progress = medalsProgress[x] ? medalsProgress[x].progress : 0;
                    //@ts-ignore
                    temp.push(medals[x]);
                
            }
            SortNewFirstThenProgress(temp)
            //@ts-ignore
            setMedals(temp);
        }
        else {
            ResetPage();
            return;
        }



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
            <div className="flex flex-col gap-4 w-full h-auto">
                {/* Filters */}
                <div className="flex flex-wrap lg:flex-row flex-col lg:gap-4 gap-2 lg:h-12 h-auto lg:mt-0 mt-8">
                    <select
                        className="select select-bordered filter-item-select w-full lg:max-w-xs"
                        value={selectedTier}
                        onChange={(e) => { setSelectedTier(Number(e.target.value)); FilterSelected(Number(e.target.value), selectedTerm, showPremium); }}
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

                    <select
                        className="select select-bordered filter-item-select w-full lg:max-w-xs"
                        value={selectedTerm}
                        onChange={(e) => { setSelectedTerm(e.target.value); FilterSelected(selectedTier, e.target.value, showPremium) }}
                    >
                        <option key={'AllTerms'} value={''}>
                            {'All'}
                        </option>
                        {subjects.map((term: any) => {
                            if (typeof term == 'string') {
                                return (
                                    <option key={term} value={term}>
                                        {term}
                                    </option>)
                            }
                        })}
                    </select>

                    <div className="flex flex-row content-center gap-2">
                        <Switch type="checkbox" checked={showPremium} onChange={(e)=>{setShowPremium(e); FilterSelected(selectedTier, selectedTerm, e);}} className="w-auto md:h-8 h-4 ml-auto my-auto" onColor={"#5eccba"} />
                        <p className="font-bold my-auto">Show Premium Medals</p>
                    </div>

                    {/* Total */}
                    <div className="self-end justify-self-end ml-auto">
                        <h2 className="text-voltage lg:text-4xl text-2xl font-bold">
                            {totalEarned}
                            <span className="text-ash lg:text-2xl text-lg">/{Object.keys(medalsList).length}  Medals Earned</span>
                        </h2>
                    </div>
                </div>

                {/* Medal Area */}
                <div className="lg:mt-4">
                    {
                        // @ts-ignore
                        medalsList.map((medal, value) => {
                            // @ts-ignore
                            if (parentList[medal.name]) {
                                return (
                                    // @ts-ignore
                                    <MedalWithChildren medalInfo={medal} progress={medalsProgress[medal.name] || { progress: 0 }} key={medal.name} children_medals={parentList[medal.name]} all_children={parentList} child_progress={medalsProgress} change_display_medal={change_display_medal} isPremiumUser={isPremiumUser} isMobile={windowWidth < 1000 ? true : false}/>
                                )
                            }

                            return (
                                // @ts-ignore
                                <Medal medalInfo={medal} progress={medalsProgress[medal.name] || { progress: 0 }} key={medal.name} change_display_medal={change_display_medal} isPremiumUser={isPremiumUser} isMobile={windowWidth < 1000 ? true : false}/>
                            )
                        })

                    }

                </div>
            </div>
        </>
    );
};

export default MedalShowcase;
