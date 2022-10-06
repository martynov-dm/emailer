import { useForm } from "react-hook-form";
import React from "react";
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button, Textarea
} from "@chakra-ui/react";
import styles from "./Form.module.css"
import { useRouter } from 'next/router'
import axios from 'axios';
import url from "../../urls";

export default function Form() {
    const validation = {
        email : {
            required: "Email is required",
            pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format"
            }
        },
        number: {
            required: "Number is required",
            valueAsNumber: true,
            validate: (value: number) => value < 15
        },
        text: {
            required: "Text is required"
        }
    }

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting }
    } = useForm();
    const router = useRouter()



    function onSubmit(values: any) {
        return axios.post(`/api/email-submit`, values)
            .then(({ data }) => {
                reset()
                return alert(JSON.stringify(data))
            })
            .then(() => router.push('/jobs'))
            .catch((err) => alert(err))
    }

    const getTextErrorMessage = () => {
        if (errors?.number?.type === "validate") return "Max number of emails is 15"
        return errors?.number?.message
    }

    return (
        <form className={styles.formWrapper} onSubmit={ handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.email || !!errors.number || !!errors.text}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                    id="email"
                    placeholder="your@email.com"
                    {...register("email", validation.email)}
                />
                <FormErrorMessage>
                    <>{ errors?.email?.message}</>
                </FormErrorMessage>

                <FormLabel mt={2} htmlFor="number">Number</FormLabel>
                <Input
                    id="number"
                    placeholder="5"
                    {...register("number", validation.number)}
                />
                <FormErrorMessage>
                    <>{getTextErrorMessage()}</>
                </FormErrorMessage>

                <FormLabel mt={2} htmlFor="text">Text</FormLabel>
                <Textarea
                    id="text"
                    size='lg'
                    placeholder="Sample text"
                    {...register("text", validation.text)}
                />
                <FormErrorMessage>
                    <>{ errors?.text?.message}</>
                </FormErrorMessage>
            </FormControl>
            <Button className={styles.button} mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
                Submit
            </Button>
        </form>
    );
}
