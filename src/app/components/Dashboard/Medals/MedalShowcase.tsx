import React from "react";
import Medal from "./Medal";

interface MedalShowcaseProps {
    medals: any;
    medalsProgress: any;
    category: String
}

const MedalShowcase = ({ medals, medalsProgress, category }: MedalShowcaseProps) => {

    //console.log(medals)
    //console.log(medalsProgress)
   // console.log(category)

    let kills_progress: any[] = [];
    let ability_progress: any[] = [];
    let game_event_progress: any[] = [];
    let clutch_progress: any[] = [];

    let temp = 0;

    if (!medals) {
        return (
            <div className="grid grid-rows-4 gap-4 h-full"></div>
        )
    }

    const IncreaseStatus = () => {
        temp++;
    }



    return (
        <>
            <div className={`grid ${category == 'game_event_medals' ? 'grid-cols-4' : ''} gap-4 h-full`}>
                {Object.keys(medals).map((value, index) => {
                    if (category == 'game_event_medals') {
                        return (
                            <div key={value + '' + index} style={{
                                // backgroundColor: 'blue',
                                display: 'flex',
                                flexWrap: 'nowrap',
                                margin: '3% auto',
                                overflowX: 'visible',
                                minHeight: '150px'
                            }}>
                                <Medal medalInfo={medals[value]} progress={medalsProgress ? medalsProgress[value] : 0}
                                    statusIncrease={IncreaseStatus}
                                    isMaster={true}
                                />

                            </div>
                        )
                    }
                    else {
                        return (
                            <div
                                key={value + '' + index}
                                style={{
                                    // backgroundColor: 'blue',
                                    display: 'block'
                                }}>
                                <h2 className="text-2xl font-bold">{value} Medals</h2>
                                <div style={{
                                    // backgroundColor: 'blue',
                                    display: 'flex',
                                    flexWrap: 'nowrap',
                                    margin: '3% auto',
                                    overflowX: 'visible',
                                }}>

                                    <Medal medalInfo={medals[value]} progress={medalsProgress} isMaster={true}
                                        key={value + 'medal'}
                                        statusIncrease={IncreaseStatus} />
                                    <hr className={`h-48 w-0.5 bg-white`} style={{ margin: 'auto 5%' }}></hr>
                                    {Object.keys(medals[value].medals).map((value2, index) => (
                                        index < 4 ?
                                            <Medal medalInfo={medals[value].medals[value2]} progress={medalsProgress ? medalsProgress[value2] : 0}
                                                key={value2 + '' + index}
                                                statusIncrease={IncreaseStatus}
                                                isMaster={true}
                                            />
                                            :
                                            ''
                                    ))}

                                </div>

                            </div>
                        )
                    }
                })}
            </div>
        </>
    );
};

export default MedalShowcase;
