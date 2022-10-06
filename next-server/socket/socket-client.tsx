import React, { createContext } from 'react'
import { io } from 'socket.io-client'
import url from "../urls";

export interface JobState {
    key: string
    state: string
}

interface Iprops {
    children: React.ReactNode
}

type Action = { type: 'update', payload: JobState } | { type: 'init', payload: JobState[] }
type Dispatch = (action: Action) => void
type State = JobState[]

export const JobsContext = React.createContext<
    {state: State; dispatch: Dispatch; initialize: any} | undefined
    >(undefined)

let dispatchUpdate: Dispatch
let isSocketConnected = false

const handleUpdate = (state: State, update: JobState) => {
    if (!state.length) return [update]

    const i = state.findIndex(_element => _element.key === update.key);

    if (i > -1) {
        state[i] = update;
        return [...state]
    } else return [...state, update]
}

function socketReducer(state: State, action: Action) {
    switch (action.type) {
        case 'update': {
            return handleUpdate(state, action.payload)
        }
        case 'init': {
            return [...action.payload]
        }
    }
}

function initialize() {
    if (isSocketConnected) return

    const socket = io(`ws://${url.api}`)
    isSocketConnected = true

    socket.on('connect', () => {
        console.log('socket connected')
    })

    socket.on("update", (update: JobState) => {
        console.log("job state update received via socket " + JSON.stringify(update));
        dispatchUpdate({ type: 'update', payload: update })
    })

    socket.on('disconnect', () => {
        console.log('socket disconnected')
    })
}

const SocketProvider = ({ children }: Iprops) => {
    const [state, dispatch] = React.useReducer(socketReducer, [])
    dispatchUpdate = dispatch

    const value = {state, dispatch, initialize}

    return (
        <JobsContext.Provider value={value}>
            {children}
        </JobsContext.Provider>
    )
}

function useJobsState() {
    const context = React.useContext(JobsContext)
    if (context === undefined) {
        throw new Error('useCount must be used within a CountProvider')
    }
    return context
}

export { SocketProvider, useJobsState }
