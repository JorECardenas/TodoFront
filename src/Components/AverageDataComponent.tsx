import {useContext} from "react";
import {DataContext} from "./Context/DataContext";
import duration from "dayjs/plugin/duration";
import dayjs from "dayjs";
import {LinearProgress} from "@mui/material";
import {BarChart} from '@mui/x-charts/BarChart';


export default function AverageDataComponent() {
    dayjs.extend(duration)

    const {data} = useContext(DataContext);

    const getTimeString = (average: number) => {

        const minutesString = dayjs.duration(average).minutes().toString().padStart(2, "0");

        const secondsString = dayjs.duration(average).seconds().toString().padStart(2, "0");

        return `${minutesString}:${secondsString}`;


    }

    const getCompetedPercentage = () => {
        return data.completedItems / data.totalItems * 100;
    }

    return (
        <div className={"container border-2 border-gray-200 p-3 bg-white"}>
            <div className={"container"}>
                <p>
                    {"Completed " + data.completedItems + " out of " + data.totalItems + " tasks"}
                </p>
                <LinearProgress
                    variant={"determinate"}
                    value={getCompetedPercentage()}
                    className={"mt-2"}
                    sx={{height: 10, borderRadius: 5}}
                />
            </div>
            <div className={"container flex flex-row gap-4 content-between"}>
                <div className={"container p-5 flex flex-col items-center justify-center gap-4"}>
                    <p>
                        General Average:
                    </p>
                    <p>
                        {getTimeString(data.averageData.generalAverage)}
                    </p>

                </div>
                <div className={"container p-3 flex flex-col items-center justify-center gap-4"}>

                    Average by priority:

                    <BarChart
                        series={[
                            {
                                data: [data.averageData.lowAverage.valueOf(),
                                    data.averageData.mediumAverage.valueOf(),
                                    data.averageData.highAverage.valueOf()]
                            },
                        ]}
                        yAxis={[{
                            scaleType: "band",
                            data: ["Low", "Medium", "High"],
                            colorMap: {
                                type: "ordinal",
                                colors: ["green", "yellow", "red"]
                            }
                        }]}
                        layout={"horizontal"}
                        height={300}
                        width={450}
                        colors={["#7C3AED", "#3C3AE3", "#AC30ED"]}
                        barLabel={(item, context) => {
                            if (item.value == null) {
                                return null
                            }

                            return context.bar.width < 60 ? null : getTimeString(item.value)
                        }}
                    />


                    {/*<div>*/}
                    {/*    <p>*/}
                    {/*        Low: {getTimeString(data.averageData.lowAverage)}*/}
                    {/*    </p>*/}
                    {/*    <p>*/}
                    {/*        Medium: {getTimeString(data.averageData.mediumAverage)}*/}
                    {/*    </p>*/}
                    {/*    <p>*/}
                    {/*        High: {getTimeString(data.averageData.highAverage)}*/}
                    {/*    </p>*/}

                    {/*</div>*/}

                </div>


            </div>
        </div>
    )


}