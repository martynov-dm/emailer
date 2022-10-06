import React from "react";

interface HeadingProps {
    tag: string;
    text: string;
}

const Heading: React.FC<HeadingProps> = ({tag, text}) => {
    const Tag: any = tag || 'h1'
    return <Tag>{text}</Tag>
}


export default Heading
