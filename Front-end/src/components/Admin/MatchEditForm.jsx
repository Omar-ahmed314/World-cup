import { useEffect, useState, useRef } from "react";
import { Form, FormBody, FormFooter, FormHeader } from "./Form"
import ReactFlagsSelect from "react-flags-select";
import Stadium from "../../Api/stadium/StadiumController";
import MatchController from "../../Api/match/MatchController";

const flagSrc = '../../images/flags'
const countries = [
    "AR",
  "AU",
  "BE",
  "BR",
  "CM",
  "CA",
  "CR",
  "HR",
  "DK",
  "EC",
  "FR",
  "DE",
  "GH",
  "IR",
  "JP",
  "KR",
  "MX",
  "MA",
  "NL",
  "PL",
  "PT",
  "QA",
  "SA",
  "SN",
  "RS",
  "ES",
  "CH",
  "TN",
  "GB",
  "US",
  "UY"
]

const customLabels = {
  AR: "Argentina",
  AU: "Australia",
  BE: "Belgium",
  BR: "Brazil",
  CM: "Cameroon",
  CA: "Canada",
  CR: "Costa Rica",
  HR: "Croatia",
  DK: "Denmark",
  EC: "Ecuador",
  FR: "France",
  DE: "Germany",
  GH: "Ghana",
  IR: "Iran",
  JP: "Japan",
  KR: "South Korea",
  MX: "Mexico",
  MA: "Morocco",
  NL: "Netherlands",
  PL: "Poland",
  PT: "Portugal",
  QA: "Qatar",
  SA: "Saudi Arabia",
  SN: "Senegal",
  RS: "Serbia",
  ES: "Spain",
  CH: "Switzerland",
  TN: "Tunisia",
  GB: "United Kingdom",
  US: "United States",
  UY: "Uruguay",
}

const customCountries = {
    Argentina: "AR",
    Australia: "AU",
    Belgium: "BE",
    Brazil: "BR",
    Cameroon: "CM",
    Canada: "CA",
    "Costa Rica": "CR",
    Croatia: "HR",
    Denmark: "DK",
    Ecuador: "EC",
    France: "FR",
    Germany: "DE",
    Ghana: "GH",
    Iran: "IR",
    Japan: "JP",
    "South Korea": "KR",
    Mexico: "MX",
    Morocco: "MA",
    Netherlands: "NL",
    Poland: "PL",
    Portugal: "PT",
    Qatar: "QA",
    "Saudi Arabia": "SA",
    Senegal: "SN",
    Serbia: "RS",
    Spain: "ES",
    Switzerland: "CH",
    Tunisia: "TN",
    "United Kingdom": "GB",
    "United States": "US",
    Uruguay: "UY",
  }

const MatchEditForm = ({isOpen, handleClose, callbackFunction, matchData}) => {
    const [firstFlagSelected, setFirstFlagSelected] = useState("");
    const [secondFlagSelected, setSecondFlagSelected] = useState("");
    const [stadiumList, setStadiumList] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    // create refs for the inputs
    const date = useRef(null);
    const time = useRef(null);
    const stadiumInput = useRef(null);
    const referee = useRef(null);
    const firstLineman = useRef(null);
    const secondLineman = useRef(null);


    const getStadiumList = async () => {
        const stadiumsList = await new Stadium().getStadiums();
        setStadiumList(stadiumsList)
    }

    const initForm = () => {
        if(matchData){

            setFirstFlagSelected(customCountries[matchData.firstTeam]);
            setSecondFlagSelected(customCountries[matchData.secondTeam]);
            let formalDate = new Date(matchData.matchDay)
            let year = formalDate.getFullYear();
            let month = ('0' + (formalDate.getMonth() + 1)).slice(-2);
            let day = ('0' + (formalDate.getDate())).slice(-2);
            date.current.value = `${year}-${month}-${day}`;
            time.current.value = matchData.matchTime;
            stadiumInput.current.value = matchData.stadiumID;
            referee.current.value = matchData.referee;
            firstLineman.current.value = matchData.linemanOne;
            secondLineman.current.value = matchData.linemanTwo;
        }
        
    }

    const updateMatch = async () => {
        try {
            const data = {
                matchID: matchData.matchID,
                firstTeam: customLabels[firstFlagSelected],
                secondTeam: customLabels[secondFlagSelected],
                matchDay: date.current.value,
                matchTime: time.current.value,
                stadiumID: stadiumInput.current.value,
                referee: referee.current.value,
                linemanOne: firstLineman.current.value,
                linemanTwo: secondLineman.current.value
            }
            await new MatchController().update(data);
            
        } catch (error) {
            
        }
    }

    const handleAddBtnClick = async () => {
        setIsLoading(true);
        await updateMatch();
        setIsLoading(false);
        handleClose();
        callbackFunction();
    }

    useEffect(() => {
        initForm();
        getStadiumList();
    }, [matchData])

    return (
        <Form isOpen={isOpen} handleClose={handleClose}>
            <FormHeader>
                Update Match
            </FormHeader>
            <FormBody>
                <label >1st Team</label>
                <ReactFlagsSelect
                    countries={countries}
                    selected={firstFlagSelected}
                    onSelect={code => setFirstFlagSelected(code)}
                    placeholder="First Team"
                    searchable/>
                <label >2nd Team</label>
                <ReactFlagsSelect
                    countries={countries}
                    selected={secondFlagSelected}
                    onSelect={code => setSecondFlagSelected(code)}
                    placeholder="Second Team"
                    searchable/>
                <label htmlFor="date">Date</label>
                <input type="date" name="date" id="date" ref={date}/>
                <label htmlFor="time">Time</label>
                <input type="time" name="time" id="time" ref={time}/>
                <label htmlFor="stadium">Stadium</label>
                <select name="stadium" id="stadium" ref={stadiumInput}>
                    {
                        stadiumList?.map((value, idx) => {
                            return (
                                <option value={value.stadiumID}>{value.stadiumName}</option>
                            )
                        })
                    }
                </select>
                <label htmlFor="referee">Referee</label>
                <input type="text" name="referee" id="referee" ref={referee}/>
                <div className="linemen" style={{display:'flex', padding:'10px 0'}}>
                    <div className="firstlineman">
                        <label htmlFor="linemanone">1st lineman</label>
                        <input type="text" name="linemanone" id="linemanone" style={{width:'100%'}} ref={firstLineman}/>
                    </div>
                    <div className="secondlineman">
                        <label htmlFor="linemantwo">2nd lineman</label>
                        <input type="text" name="linemantwo" id="linemantwo" style={{width:'100%'}} ref={secondLineman}/>
                    </div>
                </div>
            </FormBody>
            <FormFooter>
                <button onClick={handleAddBtnClick}>{isLoading ? "Waiting" : "Update"}</button>
                <button onClick={handleClose}>Cancel</button>
            </FormFooter>
        </Form>
    )
}

export default MatchEditForm;