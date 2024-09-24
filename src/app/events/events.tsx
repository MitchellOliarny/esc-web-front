"use client"
import React, { useEffect, useState } from "react";
import EventTile from "./eventTile";
import { leapfrog } from "ldrs";


export default function EventsPage(eventsDetails: any, isLoading: boolean) {

    const [medal_events, setMedalEvents] = useState(eventsDetails.events.medalEvents)
    const [past_medal_events, setPastMedalEvents] = useState(eventsDetails.events.pastMedalEvents)
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        setMedalEvents(eventsDetails.events.medalEvents)
        setPastMedalEvents(eventsDetails.events.pastMedalEvents)
        setLoading(false)
        console.log(eventsDetails)
    },[isLoading, eventsDetails])
    leapfrog.register();


  return (
    <>
      <div
        className="bg-black/30 py-20"
        style={{
          backgroundImage: `url("/eventslist-bg.jpg")`,
          backgroundPosition: "center",
        }}
      >
        <div
          id="eventsListHero"
          className="px-4 2xl:px-40 w-full max-w-[1800px] mx-auto"
        >
          <div id="heroContent">
            <h1 className="text-4xl font-bold text-white">EVENTS PAGE</h1>
            <p className="text-base text-white">
              Join our exciting tournaments and win prizes!
            </p>
          </div>
        </div>
      </div>
      <div className="min-h-screen px-4 2xl:px-40 w-full max-w-[1800px] mx-auto">
      <div style={{ display: loading ? 'flex' : 'none', fontSize: '2em', alignContent: 'flex-end', flexWrap: 'wrap-reverse' }} className="mt-4">Loading
          <l-leapfrog
            size="45"
            speed="1.75"
            color="#F5603C"
          ></l-leapfrog>
        </div>
        <div className={loading ? 'hidden' : ''}>
        <div className="items-center pt-10 xl:pt-14 pb-2">
            <div>
              <h2
                className={`text-2xl font-bold uppercase mb-2`}
              >
                MEDAL MONDAYS
              </h2>
              {medal_events.length < 1 ?
              <p className="text-white mt-4">
                There are currently no scheduled events in this category. There
                are plans for the future, so check back soon!
              </p>
              :
              <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-4">
                {medal_events.map((value: any, index: number)=>{
                    return (
                        <EventTile key={value.name} value={value} ended={false}/>
                    )
                })}
                </div>
                }
            </div>
          </div>
          <div className="items-center pt-10 xl:pt-14 pb-2 mt-4">
            <div>
              <h2
                className={`text-2xl font-bold uppercase mb-2`}
              >
                TOURNAMENTS
              </h2>
              <p className="text-white mt-4">
                There are currently no scheduled events in this category. There
                are plans for the future, so check back soon!
              </p>
            </div>
          </div>
          <div className="items-center pt-10 xl:pt-14 pb-2 mt-4">
            <div>
              <h2
                className={`text-2xl font-bold uppercase mb-2`}
              >
                LOCAL RECREATIONAL LEAGUE
              </h2>
              <p className="text-white mt-4">
                There are currently no scheduled events in this category. There
                are plans for the future, so check back soon!
              </p>
            </div>
          </div>
          <div className="items-center pt-10 xl:pt-14 pb-2 mt-4">
            <div>
              <h2
                className={`text-2xl font-bold uppercase mb-2`}
              >
                ONLINE RECREATIONAL LEAGUE
              </h2>
              <p className="text-white mt-4">
                There are currently no scheduled events in this category. There
                are plans for the future, so check back soon!
              </p>
            </div>
          </div>
          <div className="items-center pt-10 xl:pt-14 pb-2 mt-4">
              <h2
                className={`text-2xl font-bold uppercase mb-2`}
              >
                PAST EVENTS
              </h2>
              {past_medal_events.length < 1 ?
              <p className="text-white mt-4">
                There are currently no past events.
              </p>
              :
              <div className="grid xl:grid-cols-4 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
                {past_medal_events.map((value: any)=>{
                    return (
                        <EventTile key={value.name} value={value} ended={true}/>
                    )
                })}
                </div>
                }
            </div>
        </div>
      </div>
    </>
  );
}
