import {useContext} from "react";
import {DataContext} from "./Context/DataContext";
import duration from "dayjs/plugin/duration";
import dayjs from "dayjs";
import {CircularProgress} from "@mui/material";
import {BarChart} from '@mui/x-charts/BarChart';


export default function AverageDataComponent() {
    dayjs.extend(duration)

    const {data} = useContext(DataContext);

    const getTimeString = (average: number) => {

        const dur = dayjs.duration(average);
        const hours = dur.hours();
        const minutesString = dur.minutes().toString().padStart(2, "0");
        const secondsString = dur.seconds().toString().padStart(2, "0");

        return `${hours.toString().padStart(2, "0")}:${minutesString}:${secondsString}`;



    }

    const getCompetedPercentage = () => {
        return data.completedItems / data.totalItems * 100;
    }

    return (
        <div className={"container border-2 border-gray-200 p-3 bg-white"}>

            <div className={"container flex flex-row gap-4 content-between"}>
                <div className={"container p-5 flex flex-col items-center justify-center gap-4"}>
                    <h1 className={"text-xl"}>
                        General Average:
                    </h1>
                    <p className={"text-3xl"}>
                        {getTimeString(data.averageData.generalAverage)}
                    </p>

                    <p className={"text-xl"}>
                        {"Completed " + data.completedItems + " out of " + data.totalItems + " tasks"}
                    </p>
                    <CircularProgress
                        variant={"determinate"}
                        value={getCompetedPercentage()}
                        className={"mt-2"}
                        size={100}
                        thickness={5}
                    />

                </div>
                <div className={"container p-3 flex flex-col items-center justify-center gap-4"}>

                    <p className={"text-xl"}>
                        Average by priority:
                    </p>

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
                            },
                        }]}
                        xAxis={[{
                            label: "Time",
                            valueFormatter: (value) => getTimeString(value)
                        }]}
                        layout={"horizontal"}
                        height={300}
                        width={450}
                        barLabel={(item, context) => {
                            if (item.value == null) {
                                return null
                            }

                            return context.bar.width < 60 ? null : getTimeString(item.value)
                        }}
                    />

                </div>


            </div>
        </div>
    )


}