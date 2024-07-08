import {useContext} from "react";
import {DataContext} from "./Context/DataContext";
import duration from "dayjs/plugin/duration";
import dayjs from "dayjs";


export default function AverageDataComponent() {
    dayjs.extend(duration)

    const {data} = useContext(DataContext);

    const getTimeString = (average: number) => {

        let minutes = dayjs.duration(average).asMinutes().toFixed(0).toString()

        let seconds = dayjs.duration(average).seconds().toString()


        let minuteString = minutes.length === 1 ? "0" + minutes : minutes
        let secondString = seconds.length === 1 ? "0" + seconds : seconds;

        return `${minuteString}:${secondString}`;


    }

    return (
        <div className={"container flex flex-row gap-4 content-between border-2 border-gray-200 p-3"}>
            <div className={"container p-5 flex flex-col items-center justify-center gap-4"}>
                <p>
                    General Average:
                </p>
                <p>
                    {getTimeString(data.averageData.generalAverage)}
                </p>

            </div>
            <div className={"container p-5 flex flex-col items-center justify-center gap-4"}>

                Average by priority:
                <div>
                    <p>
                        Low: {getTimeString(data.averageData.lowAverage)}
                    </p>
                    <p>
                        Medium: {getTimeString(data.averageData.mediumAverage)}
                    </p>
                    <p>
                        High: {getTimeString(data.averageData.highAverage)}
                    </p>

                </div>

            </div>


        </div>
    )


}