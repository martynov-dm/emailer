import type { NextPage } from 'next'
import { useEffect } from "react";
import { JobState, useJobsState } from "../socket/socket-client";
import axios from "axios";
import {Box, CircularProgress, CircularProgressLabel, Flex, Text} from "@chakra-ui/react";
import url from "../urls";


const JobsPage: NextPage = () => {
    const { dispatch, state, initialize } = useJobsState()

    useEffect(() => {
        axios.get<JobState[]>(`http://${url.api}/api/jobs-status`)
            .then(({ data }) => {
                initialize()
                dispatch({type: 'init', payload: data})
            })
    }, [dispatch, initialize])

    const calculateValue = (value: string) => {
        const stateArr = value.split('/').map((str) => parseInt(str))
        return Math.round((stateArr[0] / stateArr[1]) * 100)
    }

    return (
       <Flex wrap={"wrap"} mb='auto' w='100%' p={4}>
           {state.map((job) => {
               const stateValue = calculateValue(job.state)
               return (
                   <Box key={job.key} maxWidth={40}>
                       <CircularProgress size='70px' mx={2} my={2} ml={8} value={stateValue} color='green.400'>
                            <CircularProgressLabel>{stateValue}%</CircularProgressLabel>
                       </CircularProgress>
                       <Text fontSize='sm'>{job.key}</Text>
                   </Box>
               )
           })}
       </Flex>
   )
}


export default JobsPage
