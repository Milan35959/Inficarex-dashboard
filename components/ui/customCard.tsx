import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

interface Props {
  content: string;
  icon: React.ReactNode;
  number: number;
}

const CustomCard = ({ content, icon, number }: Props) => {
  return (
    <div className="w-[300px] h-[100px]">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">{content}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{number}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomCard;
