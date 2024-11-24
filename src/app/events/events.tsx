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
      <div className="min-h-screen px-4 w-full max-w-[1800px] mx-auto">
      <div style={{ display: loading ? 'flex' : 'none', fontSize: '2em', alignContent: 'flex-end', flexWrap: 'wrap-reverse' }} className="mt-4">Loading
          <l-leapfrog
            size="45"
            speed="1.75"
            color="#F5603C"
          ></l-leapfrog>
        </div>
        <div className={loading ? 'hidden' : ''}>
        <div className="items-center pt-6 pb-2">
            <div>
              <h2
                className={`text-2xl font-bold uppercase mb-2`}
              >
                Available Events
              </h2>
              {!medal_events || medal_events.length < 1 ?
              <p className="text-white mt-4">
                There are currently no scheduled events in this category. There
                are plans for the future, so check back soon!
              </p>
              :
              <div className="grid h-auto pt-6 2xl:grid-cols-3 xl:grid-cols-2 sm:grid-cols-1 gap-6 mt-4">
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
              <h2
                className={`text-2xl font-bold uppercase mb-2`}
              >
                PAST EVENTS
              </h2>
              {!past_medal_events || past_medal_events.length < 1 ?
              <p className="text-white mt-4">
                There are currently no past events.
              </p>
              :
              <div className="grid h-auto pt-6 2xl:grid-cols-3 xl:grid-cols-2 sm:grid-cols-1 gap-6">
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
