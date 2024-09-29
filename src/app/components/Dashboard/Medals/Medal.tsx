import React, { useEffect, useState } from "react";
import { CircularProgress } from "@nextui-org/react";
import Image from "next/image";
import { FaXmark } from "react-icons/fa6";

interface MedalsProps {
    medalInfo: any;
    progress: any;
    statusIncrease: any;
    isMaster: boolean;
}

const Medal = ({ medalInfo, progress, statusIncrease, isMaster }: MedalsProps) => {

    const [showPopup, setShowPopUp] = useState('hidden');
    const [showLightBox, setShowLightBox] = useState('hidden');

    const [currentStatus, setCurrentStatus] = useState(0);
    const [childMedals, setChildMedals] = useState({});
    const [displayMedals, setDisplayMedals] = useState([]);

    const bucket = "https://files.esportsclubs.gg/";

    useEffect(()=> {
        let temp = 0;
        const tempProgress = typeof progress === 'number' ? progress : 0;
        if (tempProgress > 0) {
            for (const i in medalInfo.medal_tiers) {
                const condition = (medalInfo.medal_tiers[i].condition * (isMaster ? 5 : 1));
                if (Number(tempProgress) >= Number(condition)) {
                    medalInfo.current_tier = i;
                    temp++;
                }
                else {
                    medalInfo.next_tier = i;
                    if(i == '1') {
                        medalInfo.current_tier = 0;
                    }
                    break;
                }
            }
        }
        setCurrentStatus(tempProgress);
        statusIncrease(temp);
        setChildMedals(progress?.medals ? progress.medals : Object.keys(progress ? progress : {}).length > 0 ? progress : {})
    
    },[progress])

    const IncreaseStatus = (int: number) => {
        setCurrentStatus(currentStatus + int);
    }

    const RenderChildMedals = (medalArray: any) => {
        //@ts-ignore
        let temp = [];
        {Object.keys(medalArray.medals).map((value, index) => (
            // @ts-ignore
            // <FinalMedal medalInfo={medalInfo.medals[value]} progress={childMedals ? childMedals[value] : 0} 
            temp.push(<Medal 
            medalInfo={medalArray.medals[value]} 
            // @ts-ignore
            progress={childMedals ? childMedals[value] : 0}
             key={medalArray.medal_name + '_' + index} 
            statusIncrease={IncreaseStatus} 
            // @ts-ignore
            isMaster={ typeof childMedals[Object.keys(childMedals)[0]] !== 'number' ? true : false}
            />)
        ))}
        //@ts-ignore
        setDisplayMedals(temp);
        setShowLightBox('flex')
    }

    //@ts-ignore
    //console.log(isMaster)


        return (
            <>
                <div style={{ position: 'relative', flex: '0 0 16.8%', overflow: 'visible', width: '100%', height: '100%' }}>
                    <img id={medalInfo.id} alt={medalInfo.id} style={{ height: '80%', width: 'auto', cursor: 'pointer', margin: 'auto', filter: medalInfo.current_tier ? 'grayscale(0)' : 'brightness(0%) blur(3px)' }} 
                    src={
                        // "https://media.valorant-api.com/agents/" + medalInfo.id + "/fullportrait.png"
                        medalInfo.current_tier ?
                        `${bucket}${medalInfo.medal_tiers[medalInfo.current_tier].medal_id}.png` :
                        `${bucket}${medalInfo.medal_tiers['1'].medal_id}.png`
                        // `https://api.esportsclubs.gg/images/Vandal_Kills_1.png`
                    } onMouseOver={() => setShowPopUp('grid')} onMouseOut={() => setShowPopUp('hidden')} onClick={() => RenderChildMedals(medalInfo)}></img>
                    <h2 className={'font-bold'} style={{ width: '100%', textAlign: 'center', margin: '-25px auto' }}>
                        {medalInfo.medal_tiers[medalInfo.current_tier ? medalInfo.current_tier : '1'].medal_id}
                    </h2>

                    <div className={`${showPopup}`}
                        style={{
                            gridTemplateColumns: '1fr 1fr', gridTemplateRows: '.5fr 2fr 2fr', height: 'fit-content', width: '25em', position: 'absolute', backgroundColor: 'rgb(16 43 61)', borderRadius: '0.5rem',
                            top: '5em', right: '-20em', zIndex: '2', padding: '5%'
                        }}
                    >
                        <div style={{ gridColumn: '2 span', display: 'flex', flexDirection: 'column' }}>
                            <h2 className={'text-xl font-bold'} style={{ margin: '2% auto', textAlign: 'center' }}>{medalInfo.medal_name.replace('_', ' ')}</h2>
                            <p style={{ margin: '2% auto', textAlign: 'center' }}>
                                {medalInfo.medal_description.replace('XXX', medalInfo.medal_tiers[medalInfo.next_tier ? medalInfo.next_tier : '1'].condition)}
                            </p>
                            <hr></hr>
                        </div>

                        <div style={{
                            gridColumn: '2 span', display: 'grid', gridTemplateColumns: '1fr', gridTemplateRows: '5% 1fr', margin: '5% 0',
                        }}>
                            <h2 className={'font-bold'}
                                style={{ width: '100%', textAlign: 'center' }}>Next Tier Progress</h2>
                            <div style={{
                                display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr', margin: '5% 0% 5% 0%'
                            }}>
                                <div style={{
                                    display: 'grid', gridTemplateColumns: '1fr', gridTemplateRows: '1fr'
                                }}>
                                    <img src={
                                        // "https://media.valorant-api.com/agents/" + medalInfo.id + "/fullportrait.png"
                                        `${bucket}${medalInfo.medal_tiers[medalInfo.next_tier ? medalInfo.next_tier : '2'].medal_id}.png`

                                    } alt={medalInfo.medal_tiers[medalInfo.next_tier ? medalInfo.next_tier : '1'].medal_id} style={{
                                        margin: 'auto', height: 'auto', width: 'auto',
                                    }}></img>
                                    <h2 className={'font-bold'}
                                        style={{ width: '100%', textAlign: 'center', margin: '-25px auto' }}>{medalInfo.medal_tiers[medalInfo.next_tier ? medalInfo.next_tier : '1'].medal_id}</h2>
                                </div>

                                <div style={{
                                    display: 'grid', gridTemplateColumns: '1fr', gridTemplateRows: '1fr',
                                }}>
                                    <CircularProgress
                                        classNames={{
                                            svg: "w-24 h-24 drop-shadow-md",
                                            indicator: "stroke-[#5ECCBA]",
                                            track: "stroke-[#F5603C] stroke-1",
                                            value: "text-xl font-bold text-white",
                                        }}
                                        style={{ margin: '0 auto' }}
                                        aria-label="Waiting..."
                                        value={currentStatus}
                                        maxValue={medalInfo.medal_tiers[medalInfo.next_tier ? medalInfo.next_tier : '1'].condition * (isMaster ? 5 : 1)}
                                        minValue={0}
                                        // @ts-ignore
                                        formatOptions={{ style: 'percent' }}
                                        color="warning"
                                        showValueLabel={true}
                                    />
                                    <h2 className={'font-bold'}
                                        style={{ width: '100%', textAlign: 'center', margin: '0 auto' }}>{isMaster ? Math.floor(currentStatus / 5) : currentStatus} / {medalInfo.medal_tiers[medalInfo.next_tier ? medalInfo.next_tier : '1'].condition}</h2>
                                </div>
                            </div>
                            <hr></hr>
                        </div>

                        <div style={{
                            gridColumn: '2 span', display: 'grid', gridTemplateColumns: '1fr', gridTemplateRows: '10% 1fr'
                        }}>
                            <h2 className={'font-bold'}
                                style={{ width: '100%', textAlign: 'center' }}>Medal Tiers</h2>
                            <div style={{
                                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: '1fr'
                            }}>

                                {
                                    Object.keys(medalInfo.medal_tiers).map((value, index) => {
                                        return (
                                            <div style={{ margin: 'auto' }} 
                                            key={medalInfo.medal_name + '_' + index}
                                            >
                                                <img src={`${bucket}${medalInfo.medal_tiers[value].medal_id}.png`} alt={medalInfo.medal_tiers[value].medal_id}
                                                    style={{
                                                        margin: 'auto', filter: (index + 1) <= medalInfo.current_tier ? '' : index > medalInfo.current_tier ? 'brightness(0%) blur(2px)' : 'grayscale(0.25) blur(2px)' , height: 'auto', width: 'auto',
                                                    }}></img>
                                                <h2 className={'font-bold'}
                                                    style={{ width: '100%', textAlign: 'center', margin: 'auto' }}>
                                                    {(isMaster ? Math.floor(currentStatus / 5) : currentStatus) >= medalInfo.medal_tiers[value].condition ? 'Completed' : (isMaster ? Math.floor(currentStatus / 5) : currentStatus) + ' / ' + medalInfo.medal_tiers[value].condition}
                                                </h2>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </div>
                    </div>
                </div>

                {medalInfo.medals
                    ?
                    (<div className={`${showLightBox}`} style={{
                        height: '100vh', width: '100vw', position: 'fixed', top: '0%', left: '0%', backgroundColor: 'rgba(0, 0, 0, 0.5)', overflowX: 'hidden', zIndex: '1'
                    }}>
                        <div style={{
                            display: 'grid', gridTemplateRows: '10% 1fr', height: '80%', width: '80%', position: 'absolute', backgroundColor: 'rgb(16 43 80)', borderRadius: '0.5rem', zIndex: '2', padding: '2%', top: '10%', left: '10%'
                        }}>

                            <h2 style={{ width: '100%', height: '100%', textAlign: 'center', fontSize: '2em', fontWeight: 'bold' }}>{medalInfo.medal_name}</h2>
                            <FaXmark size={'3em'} onClick={() => setShowLightBox('hidden')} style={{ cursor: 'pointer', justifySelf: 'end', position: 'absolute', margin: '2%' }} />


                            <div style={{ width: '100%', height: '90%', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gridTemplateRows: '1fr 1fr 1fr 1fr' }}>
                               {displayMedals}
                            </div>
                        </div>
                    </div>)
                    :
                    ''
                }
            </>
        );
    };

    export default Medal;
