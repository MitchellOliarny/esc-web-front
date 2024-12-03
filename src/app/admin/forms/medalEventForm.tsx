"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";

// import { Orbitron } from "next/font/google";
import { Spinner } from "@nextui-org/react";
import { toast } from "react-hot-toast";
import doSubmitMedalEvent from "./actions/doSubmitMedalEvent";
import { convertTimeToUTC } from "@/app/utils/helpers";
// const orbitron = Orbitron({
//   subsets: ["latin"],
//   display: "swap",
//   adjustFontFallback: false,
// });

const MedalEventForm = (valMedals: any, goBack: VoidFunction) => {
    const [isLoading, setIsLoading] = useState(false);
    const [medals, setMedals] = useState(null);

    useEffect(()=>{
        console.log(valMedals)
        //@ts-ignore
        let temp = [];
        const cycleObject = (object: any, name: string) =>{
            for(const x in object) {
                if(typeof object[x] == 'object' && !object[x].medal_name) {
                    cycleObject(object[x], name + (name == '' ? '':':') + x)
                }
                else {
                    temp.push(
                        <option key={name+':'+x} value={name+':'+x}>{name+':'+x}</option>
                    )
                }
            }
        }
        cycleObject(valMedals.valMedals.data, '');
        for(const x in valMedals.valMedals.admin) {

                temp.push(
                    <option key={valMedals.valMedals.admin[x].category+':'+x} value={valMedals.valMedals.admin[x].category+':'+x}>{valMedals.valMedals.admin[x].category+':'+x}</option>
                )
        
        }
        //@ts-ignore
        setMedals(temp);
    }, valMedals)

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        //setIsLoading(true);

        let formData = new FormData(event.target);

        //@ts-ignore
        let gamemodes = [];
        //@ts-ignore
        let regions = [];
        //@ts-ignore
        for (const x in document.getElementById('regions').selectedOptions)
        {   
            //@ts-ignore
            if(typeof document.getElementById('regions').selectedOptions[x] == 'object') 
                //@ts-ignore
                {regions.push(document.getElementById('regions').selectedOptions[x].value)}
        }
        //@ts-ignore
        for (const x in document.getElementById('gamemodes').selectedOptions)
            {   
                //@ts-ignore
                if(typeof document.getElementById('gamemodes').selectedOptions[x] == 'object') 
                    //@ts-ignore
                    {gamemodes.push(document.getElementById('gamemodes').selectedOptions[x].value)}
            }

        let prize_values = [];
        for(const x in document.getElementsByClassName('split_element')) {
            //@ts-ignore
            if(document.getElementsByClassName('split_element')[x].value) {
                //@ts-ignore
                prize_values.push(document.getElementsByClassName('split_element')[x].value)
            }
            else {
                prize_values.push(0);
            }
        }

        formData.set(
            'prize_pool_split',
            //@ts-ignore
            JSON.stringify(prize_values.slice(0, document.getElementById('winners').value))
        )


        formData.set(
            'thumbnail',
            //@ts-ignore
            thumbnail
        )

        formData.set(
            "regions",
            //@ts-ignore
            JSON.stringify(regions)
        )

        formData.set(
            "gamemodes",
            //@ts-ignore
            JSON.stringify(gamemodes)
        )

        formData.set(
            "start_date",
            //@ts-ignore
            convertTimeToUTC(formData.get('start_date'))
          );
          formData.set(
            "end_date",
            //@ts-ignore
            convertTimeToUTC(formData.get('end_date'))
          );

          formData.set(
            "start_ad_date",
            //@ts-ignore
            convertTimeToUTC(formData.get('start_ad_date'))
          );
          formData.set(
            "end_ad_date",
            //@ts-ignore
            convertTimeToUTC(formData.get('end_ad_date'))
          );


        const response = await doSubmitMedalEvent(formData);

        console.log(response)

        if (response?.success == true) {
            console.log("success");
            toast.success('Event Created!')
        } else {
            //@ts-ignore
            toast(response.message)
            const errorFields = document.getElementsByClassName('error-message');
            for (let x = 0; x < errorFields.length; x++) {
                errorFields[x].innerHTML = "";
            }
            for (const x in response.errors) {
                const errorElement = document.getElementById(
                    (response.errors[x].param ? response.errors[x].param : response.errors[x].path) + "-error"
                );
                if (errorElement) {
                    errorElement.innerHTML += "<li>" + response.errors[x].msg + "</li>";
                }
            }
            console.log(response.errors);  
        }
        setIsLoading(false);
    };

    const [splitElements, setSplitElements] = useState([])
    const [prize_pool, setPrize_pool] = useState(0);
    const [winnerCount, setWinnerCount] = useState(0);
    const [thumbnail, setThumbnail] = useState(null)

    const handleWinnersChange = (e: any) => {
        let result = [];
        setWinnerCount(e.target.value)
        for (let i = 0; i < e.target.value; i++) {
            result.push(
                <div key={"split_" + i}>
                    <label>Winner {i+1} Prize ($ Amount)</label>
                    <input
                        type="number"
                        id={"split_" + (i + 1)}
                        name={"split_" + (i + 1)}
                        placeholder={'Winner ' + (i + 1) + ' win amount'}
                        autoComplete="off"
                        className="input w-full bg-transparent border border-white split_element"
                        required
                        onChange={handleSplitChange}
                    />
                    <div
                        id={"split_" + (i + 1) + '-error'}
                        className="italic float-left text-red-500 error-message !-mb-3"
                    ></div>
                </div>
            )
        }
        //@ts-ignore
        setSplitElements(result);
    };

    const handleSplitTypeChange = (e: any) => {
        if (e.target.value == 'even_split') {
            setSplitElements([]);
        }
        else {
            handleWinnersChange({ target: { value: winnerCount } });
        }
    }

    const handleSplitChange = (e: any) => {
        const values = document.getElementsByClassName('split_element');
        let total = 0;
        for (const x in values) {
            if (typeof values[x] == 'object') {
                //@ts-ignore
                total += Number(values[x].value);
            }
        }
        console.log(total)
        setPrize_pool(total);
    }



    return (
        <>
            <button onClick={()=>valMedals.goBack()} className="w-40 h-16 back-graphite rounded-lg mx-8">Back</button>
            <h1 className="p-8 font-bold text-3xl">Create Medal Event</h1>
            <form id="registerForm" className="py-10" onSubmit={handleSubmit}>
                <div id="eventName" className="px-10 mb-4 gap-2 grid grid-cols-1">
                    <div>
                    <label>Event Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Event Name.."
                            autoComplete="off"
                            className="input w-full bg-transparent border border-white"
                            required
                        />
                        <div
                            id="name-error"
                            className="italic float-left text-red-500 error-message"
                        ></div>
                    </div>
                </div>

                <div
                    id="descriptionLine"
                    className="px-10 mb-4 gap-2 grid grid-cols-1"
                >
                    <div>
                    <label>Event Description</label>
                        <input
                            type="textarea"
                            name="description"
                            id="description"
                            placeholder="Event Description.."
                            className="input w-full bg-transparent border border-white"
                            required

                        />
                        <div
                            id="description-error"
                            className="italic float-left text-red-500 error-message !-mb-3"
                        ></div>
                    </div>
                </div>

                <div id="medal" className="px-10 mb-4 gap-2 grid grid-cols-1">
                    <div>
                        <label>Event Medal</label>
                        <input
                            id="medal_condition"
                            name="medal_condition"
                            placeholder="Medal"
                            autoComplete="off"
                            className="input w-full bg-transparent border border-white"
                            required
                            list="medals_list"
                        >
                        </input>
                        <datalist id="medals_list">
                            <option disabled value="null">Event Medal</option>
                            {medals}
                        </datalist>
                        <div
                            id="name-error"
                            className="italic float-left text-red-500 error-message"
                        ></div>
                    </div>
                </div>

                
                <div id="objective_line" className="px-10 mb-4 gap-2 grid grid-cols-1">
                    <div>
                        <label>Event Objective</label>
                        <input
                            id="objective"
                            name="objective"
                            autoComplete="off"
                            className="input w-full bg-transparent border border-white"
                            required
                            placeholder="Event Objective..."
                            type="text"
                        >
                        </input>
                        <div
                            id="name-error"
                            className="italic float-left text-red-500 error-message"
                        ></div>
                    </div>
                </div>

                <div id="entryFeeLine" className="px-10 mb-4 grid grid-cols-2 gap-2">
                    <div>
                    <label>Free Entry? (0 if open to public, 1 if subscibers only)</label>
                        <input
                            type="number"
                            id="entry_fee"
                            name="entry_fee"
                            placeholder="Entry Fee.. (Nearest Whole Dollar)"
                            className="input w-full bg-transparent border border-white"
                            required
                            autoComplete="off"
                        />
                        <div
                            id="entry_fee-error"
                            className="italic float-left text-red-500 error-message !-mb-3"
                        ></div>
                    </div>

                    <div>
                        <label>Prize Pool.. (total to split)</label>
                        <input
                            type="number"
                            id="prize_pool"
                            name="prize_pool"
                            placeholder="Prize Pool.. (total)"
                            className="input w-full bg-transparent border border-white"
                            required
                            autoComplete="off"
                            value={prize_pool}
                            onChange={(e: any) => { setPrize_pool(e.target.value) }}
                        />
                        <div
                            id="prize_pool-error"
                            className="italic float-left text-red-500 error-message !-mb-3"
                        ></div>
                    </div>
                </div>

                <div id="teamLimitLine" className="px-10 mb-4 grid grid-cols-2 gap-2">
                    <div>
                        <label>Player Limit (0 if uncapped)</label>
                        <input
                            type="Number"
                            id="team_limit"
                            name="team_limit"
                            placeholder="Player Limit.. (0 if uncapped)"
                            autoComplete="off"
                            className="input w-full bg-transparent border border-white"
                            required
                        // onChange={handleRiotChange}
                        />
                        <div
                            id="team_limit-error"
                            className="italic float-left text-red-500 error-message !-mb-3"
                        ></div>
                    </div>
                    <div>
                    <label>Winners Count</label>
                        <input
                            type="number"
                            id="winners"
                            name="winners"
                            placeholder="Winner Count.. (split prize pool)"
                            autoComplete="off"
                            className="input w-full bg-transparent border border-white"
                            required
                            onChange={handleWinnersChange}
                        />
                        <div
                            id="winners-error"
                            className="italic float-left text-red-500 error-message !-mb-3"
                        ></div>
                    </div>
                </div>

                <div id="prizeTypeLine" className="px-10 mb-4 grid grid-cols-2 gap-2">
                    <div>
                    <label>Prizing Split Type</label>
                        <select
                            id="prize_type"
                            name="prize_type"
                            autoComplete="off"
                            className="input w-full bg-transparent border border-white"
                            required
                            onChange={handleSplitTypeChange}
                            defaultValue={'null'}
                        >
                            <option value={'null'} disabled>Prize Split Type</option>
                            <option value="even_split">Split Evenly</option>
                            <option value="cascade_split">Cascade Split</option>
                        </select>
                        <div
                            id="prize_type-error"
                            className="italic float-left text-red-500 error-message !-mb-3"
                        ></div>
                    </div>
                    <div>
                    <label>Event Thumbnail</label>
                        <input
                            type="file"
                            id="thumbnail"
                            name="thumbnail"
                            placeholder="Thumbnail"
                            autoComplete="off"
                            className="input w-full bg-transparent border border-white"
                            //@ts-ignore
                          onChange={(e)=>setThumbnail(e.target.files[0] || null)}
                        />
                        <div
                            id="thumbnail-error"
                            className="italic float-left text-red-500 error-message !-mb-3"
                        ></div>
                    </div>
                </div>

                <div id="prizeSplitLine" className="px-10 mb-4 grid grid-cols-2 gap-2">
                    {
                        splitElements
                    }


                </div>

                <div id="game_limit_line" className="px-10 mb-4 grid grid-cols-2 gap-2">
                    <div>
                    <label>Game Limit (0 if uncapped)</label>
                        <input
                            id="game_limit"
                            name="game_limit"
                            autoComplete="off"
                            className="input w-full bg-transparent border border-white"
                            type="Number"
                            required
                            placeholder="Game Limit (0 if uncapped)"
                            
                        >
                                        
                        </input>
                        <div
                            id="game_limit-error"
                            className="italic float-left text-red-500 error-message !-mb-3"
                        ></div>
                    </div>
                    <div>

                    </div>
                </div>

                <div id="rankLine" className="px-10 mb-4 grid grid-cols-2 gap-2">
                    <div>
                    <label>Minimum Rank Requirement (included)</label>
                        <select
                            id="min_rank"
                            name="min_rank"
                            autoComplete="off"
                            className="input w-full bg-transparent border border-white"
                            required
                            
                            defaultValue={'null'}
                        >
                            <option value='null' disabled>Minimum Rank</option>
                            <option value="0">Uranked</option>
                            <option value="3">Iron</option>
                            <option value="6">Bronze</option>
                            <option value="9">Silver</option>
                            <option value="12">Gold</option>
                            <option value="15">Platinum</option>
                            <option value="18">Diamond</option>
                            <option value="21">Ascendant</option>
                            <option value="24">Immortal</option>
                            <option value="27">Radiant</option>                      
                        </select>
                        <div
                            id="min_rank-error"
                            className="italic float-left text-red-500 error-message !-mb-3"
                        ></div>
                    </div>
                    <div>
                    <label>Maximum Rank Requirement (included)</label>
                        <select
                            id="max_rank"
                            name="max_rank"
                            autoComplete="off"
                            className="input w-full bg-transparent border border-white"
                            required
                           
                            defaultValue={'null'}
                        >
                            <option value='null' disabled>Maximum Rank</option>
                            <option value="0">Uranked</option>
                            <option value="3">Iron</option>
                            <option value="6">Bronze</option>
                            <option value="9">Silver</option>
                            <option value="12">Gold</option>
                            <option value="15">Platinum</option>
                            <option value="18">Diamond</option>
                            <option value="21">Ascendant</option>
                            <option value="24">Immortal</option>
                            <option value="27">Radiant</option>  
                        </select>
                        <div
                            id="max_rank-error"
                            className="italic float-left text-red-500 error-message !-mb-3"
                        ></div>
                    </div>
                </div>

                <div id="regionLine" className="px-10 mb-4 grid grid-cols-2 gap-2">
                    <div className="h-32">
                     <label>Allowed Regions (ctrl + click to select multiple)</label>
                        <select
                            id="regions"
                            name="regions"
                            autoComplete="off"
                            className="input w-full h-full bg-transparent border border-white transparent font-bold"
                            required
                          
                            multiple
                        >
                            <option disabled>Regions Allowed:</option>
                            <option value="na">NA</option>
                            <option value="eu">EU</option>
                            <option value="ap">AP</option>               
                        </select>
                        <div
                            id="regions-error"
                            className="italic float-left text-red-500 error-message !-mb-3"
                        ></div>
                    </div>
                    <div className="h-32">
                    <label>Allowed Gamemodes (ctrl + click to select multiple)</label>
                        <select
                            id="gamemodes"
                            name="gamemodes"
                            autoComplete="off"
                            className="input w-full h-full bg-transparent border border-white transparent font-bold"
                            required
                         
                            multiple
                        >
                            <option disabled>Gamemodes Allowed:</option>
                            <option value="Unrated">Unrated</option>
                            <option value="Competitive">Competitive</option>
                            <option value="Premier">Premier</option>
                            <option value="Swiftplay">Swiftplay</option>
                            <option value="Deathmatch">Deathmatch</option>
                            <option value="Team Deathmatch">Team Deathmatch</option>
                        </select>
                        <div
                            id="gamemodes-error"
                            className="italic float-left text-red-500 error-message !-mb-3"
                        ></div>
                    </div>
                </div>
                <div id="dateLine" className="px-10 mb-4 grid grid-cols-2 gap-2">
                    <div>
                    <label>Starting Date and Time (use your local time)</label>
                        <input
                            type="datetime-local"
                            id="start_date"
                            name="start_date"
                            placeholder="Start Date.."
                            autoComplete="off"
                            className="input w-full bg-transparent border border-white"
                            required
                        
                        />
                        <div
                            id="start_date-error"
                            className="italic float-left text-red-500 error-message !-mb-3"
                        ></div>
                    </div>
                    <div>
                    <label>Ending Date and Time (use your local time)</label>
                        <input
                            type="datetime-local"
                            id="end_date"
                            name="end_date"
                            placeholder="End Date.."
                            autoComplete="off"
                            className="input w-full bg-transparent border border-white"
                            required
                        
                        />
                        <div
                            id="end_date-error"
                            className="italic float-left text-red-500 error-message !-mb-3"
                        ></div>
                    </div>
                </div>
                <div id="advertiseLine" className="px-10 mb-4 grid grid-cols-2 gap-2">
                    <div>
                    <label>Starting Advertisement Date and Time (use your local time)</label>
                        <input
                            type="datetime-local"
                            id="start_ad_date"
                            name="start_ad_date"
                            placeholder="Start Advertising Date.."
                            autoComplete="off"
                            className="input w-full bg-transparent border border-white"
                            required
                        
                        />
                        <div
                            id="start_ad_date-error"
                            className="italic float-left text-red-500 error-message !-mb-3"
                        ></div>
                    </div>
                    <div>
                    <label>Ending Advertisement Date and Time (use your local time)</label>
                        <input
                            type="datetime-local"
                            id="end_ad_date"
                            name="end_ad_date"
                            placeholder="End Avertising Date.."
                            autoComplete="off"
                            className="input w-full bg-transparent border border-white"
                            required
                        
                        />
                        <div
                            id="end_ad_date-error"
                            className="italic float-left text-red-500 error-message !-mb-3"
                        ></div>
                    </div>
                </div>

                <div className="grid">
                    <button
                        id="submitEvent"
                        type="submit"
                        disabled={isLoading}
                        className="justify-self-center w-[40%] btn text-white h-14 text-2xl bg-[#F5603C] hover:bg-[#AC442A] drop-shadow-lg border border-white hover:border-white"
                    >
                        {isLoading ? "" : "CREATE EVENT"}
                        <Spinner color="default" size={'sm'} className={`${isLoading ? '' : 'hidden'}`} />
                    </button>
                </div>
            </form>

        </>
    );
};

export default MedalEventForm;
