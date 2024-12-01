"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";

// import { Orbitron } from "next/font/google";
import { Spinner } from "@nextui-org/react";
import { toast } from "react-hot-toast";
import doSubmitMedalEvent from "./actions/doSubmitMedalEvent";
import { convertTimeToUTC } from "@/app/utils/helpers";

const MedalForm = (valMedals: any, details: any, goBack: VoidFunction) => {
    const [isLoading, setIsLoading] = useState(false);
    const [medals, setMedals] = useState({})
    const [medalTiers, setMedalTiers] = useState({})

    useEffect(() => {
        console.log(valMedals)
        //@ts-ignore
        let temp = {};
        let temp2 = {};
        Object.keys(valMedals.details).map((cat: any, index: number) => {
                Object.keys(valMedals.details[cat]).map((medal: any, index: number) => {
                    //@ts-ignore
                    temp[valMedals.details[cat][medal].id] = valMedals.details[cat][medal]
                    //@ts-ignore
                    temp2[valMedals.valMedals[cat][medal].name] = valMedals.valMedals[cat][medal]
                })
        })
        //@ts-ignore
        setMedals(temp)
        setMedalTiers(temp2)
    }, [valMedals])

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        //setIsLoading(true);

        let formData = new FormData(event.target);

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

    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState('');
    const [statName, setStatName] = useState('');
    const [statCondition, setStatCondition] = useState('');
    const [premium, setPremium] = useState(false);
    const [date, setDate] = useState('');
    const [queues, setQueues] = useState('')
    const [parent, setParent] = useState('');
    const [statAdd, setStatAdd] = useState(1)
    const [tierCount, setTierCount] = useState(1);

    const [medalConditions, setMedalConditions] = useState([]);

    const [edit, setEdit] = useState(false);
    const [editMedal, setEditMedal] = useState('');

    const ChangeEditMedal = (value: string) => {
        setEditMedal(value);
        //@ts-ignore
        setName(medals[value].name);
        //@ts-ignore
        setDesc(medals[value].description)
        //@ts-ignore
        setCategory(medals[value].category);
        //@ts-ignore
        setStatName(medals[value].stat_name)
        //@ts-ignore
        setStatCondition(medals[value].stat_condition)
        //@ts-ignore
        setStatAdd(medals[value].stat_addition)
        //@ts-ignore
        setPremium(medals[value].isPremium ? true : false)
        //@ts-ignore
        setDate(new Date(medals[value].creation_date).toISOString().slice(0, 16))
        //@ts-ignore
        setQueues(medals[value].gamemodes)
        //@ts-ignore
        setParent(medals[value].parent_medal)
        //@ts-ignore
        setMedalConditions(medals[value].medal_conditions)
        //@ts-ignore
        setTierCount(medals[value].medal_conditions.length)
    }

    const CreateMedal = () => {
        setEdit(false)
        setEditMedal('');
        //@ts-ignore
        setName('');
        //@ts-ignore
        setDesc('')
        //@ts-ignore
        setCategory('');
        //@ts-ignore
        setStatName('')
        //@ts-ignore
        setStatCondition('')
        //@ts-ignore
        setStatAdd('')
        //@ts-ignore
        setPremium(false)
        //@ts-ignore
        setDate('')
        //@ts-ignore
        setQueues('')
        //@ts-ignore
        setParent('')
        //@ts-ignore
        setMedalConditions('')
        //@ts-ignore
        setTierCount(1)
    }

    return (
        <>
            <button onClick={() => goBack} className="w-40 h-16 back-graphite rounded-lg mx-8">Back</button>
            <h1 className="p-8 font-bold text-3xl">Medal Form</h1>

            <div className="m-8 flex gap-8">
                <button className={`btn text-white h-14 text-2xl bg-[#F5603C] hover:bg-[#AC442A] drop-shadow-lg border ${!edit ? 'border-white' : 'border-0'} hover:border-white`} onClick={() => CreateMedal()}>Create Medal</button>
                <div className="inline-flex">
                    <button className={`btn text-white h-14 text-2xl bg-[#F5603C] hover:bg-[#AC442A] drop-shadow-lg border ${edit ? 'border-white' : 'border-0'} hover:border-white`} onClick={() => setEdit(true)}>Edit Medal</button>
                    <select
                        value={editMedal}
                        onChange={(e) => ChangeEditMedal(e.target.value)}
                        className={`${edit ? '' : 'hidden'} input w-full bg-transparent border border-white`}
                    >
                        <option>Select a Medal</option>
                        {
                            Object.keys(medals).map((medal: any, index: number) => {
                                return (
                                    //@ts-ignore
                                    <option value={medals[medal].id} key={medals[medal].id}>{medals[medal].id}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>


            <form id="registerForm" className="py-10" onSubmit={handleSubmit}>
                <div id="eventName" className="px-10 mb-4 gap-2 grid grid-cols-1">
                    <div>
                        <label>Medal Name</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Medal Name.."
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
                    className="px-10 mb-4 gap-2 grid grid-cols-1"
                >
                    <div>
                        <label>Medal Description</label>
                        <input
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            type="textarea"
                            name="description"
                            id="description"
                            placeholder="Medal Description.."
                            className="input w-full bg-transparent border border-white"
                            required

                        />
                        <div
                            id="description-error"
                            className="italic float-left text-red-500 error-message !-mb-3"
                        ></div>
                    </div>
                </div>

                <div
                    className="px-10 mb-4 gap-2 grid grid-cols-1">

                    <div>
                        <label>Medal Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            name="category"
                            id="category"
                            className="input w-full bg-transparent border border-white"
                            required

                        >

                            <option disabled value="">Select a Category</option>
                            <option value="agent_medals">Agent</option>
                            <option value="weapon_medals">Weapon</option>
                            <option value="game_event_medals">Game Event</option>
                        </select>
                        <div
                            id="category-error"
                            className="italic float-left text-red-500 error-message !-mb-3"
                        ></div>
                    </div>

                </div>

                <div
                    className="px-10 mb-4 gap-2 grid grid-cols-2">

                    <div>
                        <label>Stat Condition (This is found on the spreadsheet, copy exactly from there)</label>
                        <input
                            value={statCondition}
                            onChange={(e) => setStatCondition(e.target.value)}
                            type="textarea"
                            name="stat_condition"
                            id="stat_condition"
                            placeholder="Stat Condition.."
                            className="input w-full bg-transparent border border-white"
                            required

                        />
                        <div
                            id="stat_condition-error"
                            className="italic float-left text-red-500 error-message !-mb-3"
                        ></div>
                    </div>


                    <div>
                        <label>Stat Name (This is found on the spreadsheet, copy exactly from there)</label>
                        <input
                            value={statName}
                            onChange={(e) => setStatName(e.target.value)}
                            type="textarea"
                            name="stat_name"
                            id="stat_name"
                            placeholder="Stat Name.."
                            className="input w-full bg-transparent border border-white"
                            required

                        />
                        <div
                            id="stat_name-error"
                            className="italic float-left text-red-500 error-message !-mb-3"
                        ></div>
                    </div>

                </div>

                <div
                    className="px-10 mb-4 gap-2 grid grid-cols-2">

                    <div>
                        <label>Eligible Queues (This is found on the spreadsheet, copy exactly from there)</label>
                        <input
                            value={queues}
                            onChange={(e) => setQueues(e.target.value)}
                            type="textarea"
                            name="queues"
                            id="queues"
                            placeholder="Queues.."
                            className="input w-full bg-transparent border border-white"
                            required

                        />
                        <div
                            id="queues-error"
                            className="italic float-left text-red-500 error-message !-mb-3"
                        ></div>
                    </div>


                    <div>
                        <label>Tier Count</label>
                        <input
                            value={tierCount}
                            onChange={
                                //@ts-ignore
                                (e) => setTierCount(e.target.value)}
                            type="number"
                            name="tier_count"
                            id="tier_count"
                            placeholder="Tier Count..."
                            className="input w-full bg-transparent border border-white"
                            required

                        />
                        <div
                            id="description-error"
                            className="italic float-left text-red-500 error-message !-mb-3"
                        ></div>
                    </div>

                </div>

                <div
                    className="px-10 mb-4 gap-2 grid grid-cols-5">

                    {

                        editMedal ?
                        //@ts-ignore
                        Object.keys(medalTiers[editMedal].medal_tiers).map((index, key) => {
                            return (
                                <div key={key}>
                                    <label className="font-bold text-lg">Tier {key + 1}</label>
                                    <br></br>
                                    <label>Condition</label>
                                    <input
                                    //@ts-ignore
                                        value={medalTiers[editMedal].medal_tiers[index].condition}
                                        type="number"
                                        name={"tier" + (key + 1) + '_condition'}
                                        id={"tier" + (key + 1) + '_condition'}
                                        placeholder="Amount needed.."
                                        className="input w-full bg-transparent border border-white tier-condition"
                                        required

                                    />
                                    <div
                                        id="queues-error"
                                        className="italic float-left text-red-500 error-message !-mb-3"
                                    ></div>
                                    <label>Image</label>
                                    <input
                                        type='file'
                                        name={"tier" + (key + 1) + '_image'}
                                        id={"tier" + (key + 1) + '_image'}
                                        placeholder="Tier Image"
                                        className="input w-full bg-transparent border border-white tier-file"
                                        required

                                    />
                                    <label>Existing Image</label>
                                    <img id={"tier" + (key + 1) + '_curr_image'} alt='none' src={
                                        //@ts-ignore
                                        "https://files.esportsclubs.gg/"+medalTiers[editMedal].medal_tiers[index].medal_id} className="h-12 w-auto"></img>
                                </div>
                            )
                        })

                        :

                        Array.from({ length: tierCount }).map((index, key) => {
                            return (
                                <div key={key}>
                                    <label className="font-bold text-lg">Tier {key + 1}</label>
                                    <br></br>
                                    <label>Condition</label>
                                    <input
                                        type="number"
                                        name={"tier" + (key + 1) + '_condition'}
                                        id={"tier" + (key + 1) + '_condition'}
                                        placeholder="Amount needed.."
                                        className="input w-full bg-transparent border border-white tier-condition"
                                        required

                                    />
                                    <div
                                        id="queues-error"
                                        className="italic float-left text-red-500 error-message !-mb-3"
                                    ></div>
                                    <label>Image</label>
                                    <input
                                        type='file'
                                        name={"tier" + (key + 1) + '_image'}
                                        id={"tier" + (key + 1) + '_image'}
                                        placeholder="Tier Image"
                                        className="input w-full bg-transparent border border-white tier-file"
                                        required

                                    />
                                    <label>Existing Image</label>
                                    <img id={"tier" + (key + 1) + '_curr_image'} alt='none' src={""} className="h-12 w-auto"></img>
                                </div>
                            )
                        })
                    }

                </div>

                <div
                    className="px-10 mb-4 gap-2 grid grid-cols-2">

                    <div>
                        <label>Parent Medal</label>
                        <select
                            value={parent}
                            onChange={(e) => setParent(e.target.value)}
                            name="parent"
                            id="parent"
                            className="input w-full bg-transparent border border-white"

                        >
                            <option disabled value="">Select a Parent (Leave if none)</option>
                            {
                                Object.keys(medals).map((medal: any, index: number) => {
                                    return (
                                        //@ts-ignore
                                        <option value={medals[medal].id} key={medals[medal].id}>{medals[medal].id}</option>
                                    )
                                })
                            }
                        </select>
                        <div
                            id="queues-error"
                            className="italic float-left text-red-500 error-message !-mb-3"
                        ></div>
                    </div>


                    <div>
                        <label>Amount of Progress to Add every completion (1 by default)</label>
                        <input
                            value={statAdd}
                            onChange={
                                //@ts-ignore
                                (e) => setStatAdd(e.target.value)}
                            type="number"
                            name="stat_add"
                            id="stat_add"
                            placeholder="Stat Addition..."
                            className="input w-full bg-transparent border border-white"

                        />
                        <div
                            id="description-error"
                            className="italic float-left text-red-500 error-message !-mb-3"
                        ></div>
                    </div>

                </div>




                <div id="dateLine" className="px-10 mb-4 grid grid-cols-2 gap-2">
                    <div>
                        <label>Release Date and Time (use your local time)</label>
                        <input
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            type="datetime-local"
                            id="date"
                            name="date"
                            placeholder="ReleaseDate.."
                            autoComplete="off"
                            className="input w-full bg-transparent border border-white"
                            required

                        />
                        <div
                            id="date-error"
                            className="italic float-left text-red-500 error-message !-mb-3"
                        ></div>
                    </div>

                    <div className="block">
                        <label>Premium?</label>
                        <br></br>
                        <input
                            value={premium ? 'on' : 'off'}
                            onChange={(e) => setPremium(e.target.checked)}
                            type="checkbox"
                            id="premium"
                            name="premium"
                            autoComplete="off"
                            className="h-12 rounded-lg w-12 bg-transparent border border-white"
                            required

                        />
                        <div
                            id="date-error"
                            className="italic float-left text-red-500 error-message !-mb-3"
                        ></div>
                    </div>

                </div>

                <div className="grid mt-16">
                    {edit ? 
                    <div className="w-full flex gap-4 justify-around">
                         <button
                        id="deleteMedal"
                        type="button"
                        disabled={isLoading}
                        className="justify-self-center w-[40%] btn text-white h-14 text-2xl bg-[#db1e1e] hover:bg-[#912a2a] drop-shadow-lg border border-white hover:border-white"
                    >
                        {isLoading ? "" : "DELETE MEDAL"}
                        <Spinner color="default" size={'sm'} className={`${isLoading ? '' : 'hidden'}`} />
                    </button>
                        <button
                        id="submitMedal"
                        type="submit"
                        disabled={isLoading}
                        className="justify-self-center w-[40%] btn text-white h-14 text-2xl bg-[#F5603C] hover:bg-[#AC442A] drop-shadow-lg border border-white hover:border-white"
                    >
                        {isLoading ? "" : "SUBMIT EDITS"}
                        <Spinner color="default" size={'sm'} className={`${isLoading ? '' : 'hidden'}`} />
                    </button>
                    </div>
                    :
                    <button
                        id="submitMedal"
                        type="submit"
                        disabled={isLoading}
                        className="justify-self-center w-[40%] btn text-white h-14 text-2xl bg-[#F5603C] hover:bg-[#AC442A] drop-shadow-lg border border-white hover:border-white"
                    >
                        {isLoading ? "" : "CREATE MEDAL"}
                        <Spinner color="default" size={'sm'} className={`${isLoading ? '' : 'hidden'}`} />
                    </button>
                    }
                </div>
            </form >

        </>
    );
};

export default MedalForm;
