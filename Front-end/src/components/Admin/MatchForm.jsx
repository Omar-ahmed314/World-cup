import { useEffect, useState, useRef } from 'react';
import { Form, FormBody, FormFooter, FormHeader } from './Form';
import ReactFlagsSelect from 'react-flags-select';
import Stadium from '../../Api/stadium/StadiumController';
import MatchController from '../../Api/match/MatchController';

const flagSrc = '../../images/flags';
const countries = [
  'AR',
  'AU',
  'BE',
  'BR',
  'CM',
  'CA',
  'CR',
  'HR',
  'DK',
  'EC',
  'FR',
  'DE',
  'GH',
  'IR',
  'JP',
  'KR',
  'MX',
  'MA',
  'NL',
  'PL',
  'PT',
  'QA',
  'SA',
  'SN',
  'RS',
  'ES',
  'CH',
  'TN',
  'GB',
  'US',
  'UY',
];

const customLabels = {
  AR: 'Argentina',
  AU: 'Australia',
  BE: 'Belgium',
  BR: 'Brazil',
  CM: 'Cameroon',
  CA: 'Canada',
  CR: 'Costa Rica',
  HR: 'Croatia',
  DK: 'Denmark',
  EC: 'Ecuador',
  FR: 'France',
  DE: 'Germany',
  GH: 'Ghana',
  IR: 'Iran',
  JP: 'Japan',
  KR: 'South Korea',
  MX: 'Mexico',
  MA: 'Morocco',
  NL: 'Netherlands',
  PL: 'Poland',
  PT: 'Portugal',
  QA: 'Qatar',
  SA: 'Saudi Arabia',
  SN: 'Senegal',
  RS: 'Serbia',
  ES: 'Spain',
  CH: 'Switzerland',
  TN: 'Tunisia',
  GB: 'United Kingdom',
  US: 'United States',
  UY: 'Uruguay',
};

const MatchForm = ({ isOpen, handleClose, callbackFunction }) => {
  const [firstFlagSelected, setFirstFlagSelected] = useState('');
  const [secondFlagSelected, setSecondFlagSelected] = useState('');
  const [stadiumList, setStadiumList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const matchController = MatchController();
  const stadiumAPI = Stadium();
  // create refs for the inputs
  const date = useRef(null);
  const time = useRef(null);
  const stadiumInput = useRef(null);
  const referee = useRef(null);
  const firstLineman = useRef(null);
  const secondLineman = useRef(null);

  const getStadiumList = async () => {
    const stadiumsList = await stadiumAPI.getStadiums();
    setStadiumList(stadiumsList);
  };

  const addMatch = async () => {
    try {
      const matchData = {
        firstTeam: customLabels[firstFlagSelected],
        secondTeam: customLabels[secondFlagSelected],
        matchDay: date.current.value,
        matchTime: time.current.value,
        stadiumID: stadiumInput.current.value,
        referee: referee.current.value,
        linemanOne: firstLineman.current.value,
        linemanTwo: secondLineman.current.value,
      };
      await matchController.add(matchData);
    } catch (error) {}
  };

  const handleAddBtnClick = async () => {
    setIsLoading(true);
    await addMatch();
    setIsLoading(false);
    handleClose();
    callbackFunction();
  };

  useEffect(() => {
    getStadiumList();
  }, []);

  return (
    <Form isOpen={isOpen} handleClose={handleClose}>
      <FormHeader>Add Match</FormHeader>
      <FormBody>
        <label>1st Team</label>
        <ReactFlagsSelect
          countries={countries}
          selected={firstFlagSelected}
          onSelect={(code) => setFirstFlagSelected(code)}
          placeholder="First Team"
          searchable
        />
        <label>2nd Team</label>
        <ReactFlagsSelect
          countries={countries}
          selected={secondFlagSelected}
          onSelect={(code) => setSecondFlagSelected(code)}
          placeholder="Second Team"
          searchable
        />
        <label htmlFor="date">Date</label>
        <input type="date" name="date" id="date" ref={date} />
        <label htmlFor="time">Time</label>
        <input type="time" name="time" id="time" ref={time} />
        <label htmlFor="stadium">Stadium</label>
        <select name="stadium" id="stadium" ref={stadiumInput}>
          {stadiumList?.map((value, idx) => {
            return <option value={value.stadiumID}>{value.stadiumName}</option>;
          })}
        </select>
        <label htmlFor="referee">Referee</label>
        <input type="text" name="referee" id="referee" ref={referee} />
        <div className="linemen" style={{ display: 'flex', padding: '10px 0' }}>
          <div className="firstlineman">
            <label htmlFor="linemanone">1st lineman</label>
            <input
              type="text"
              name="linemanone"
              id="linemanone"
              style={{ width: '100%' }}
              ref={firstLineman}
            />
          </div>
          <div className="secondlineman">
            <label htmlFor="linemantwo">2nd lineman</label>
            <input
              type="text"
              name="linemantwo"
              id="linemantwo"
              style={{ width: '100%' }}
              ref={secondLineman}
            />
          </div>
        </div>
      </FormBody>
      <FormFooter>
        <button onClick={handleAddBtnClick}>
          {isLoading ? 'Waiting' : 'Add'}
        </button>
        <button onClick={handleClose}>Cancel</button>
      </FormFooter>
    </Form>
  );
};

export default MatchForm;
