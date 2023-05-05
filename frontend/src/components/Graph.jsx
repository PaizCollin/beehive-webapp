import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { parseISO, format } from "date-fns";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <Box
        sx={{
          bgcolor: "background.default",
          color: "primary.light",
          p: 1,
        }}
      >
        <Typography variant="body2">
          {/* {format(parseISO(label), "eeee, d MMM yyyy")} */}
        </Typography>
        <Typography variant="body2">
          {payload[0].value} {payload[0].unit} X
        </Typography>
        <Typography variant="body2">
          {payload[1].value} {payload[0].unit} Y
        </Typography>
        <Typography variant="body2">
          {payload[2].value} {payload[0].unit} °C
        </Typography>
      </Box>
    );
  }

  return null;
};

const MyXAxis = ({ data }) => {
  return (
    <XAxis
      dataKey="date"
      axisLine={false}
      tickLine={false}
      tickFormatter={(str) => {
        const date = parseISO(str);
        if (date.getDate() % 7 === 0) {
          return format(date, "MMM, d");
        }
        return "";
      }}
    />
  );
};

const Graph = ({ device }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  let data = [
    {
      time: "2023-05-04T00:00:00.000000+00:00",
      raw_activity: { x: 0.06674091034340102, y: 0.5546026013666321 },
      weather: {
        temp: 24.89097762663792,
        humidity: 0.7424819436362586,
        windspeed: 6.1616709713762035,
      },
      prediction_activity: { x: 0.947806025320148, y: 0.8945926380464484 },
      last_prediction_deviation: 0.48053379556145837,
    },
    {
      time: "2023-05-04T00:05:00.000000+00:00",
      raw_activity: { x: 0.8293224159371451, y: 0.25616450881041086 },
      weather: {
        temp: 22.44821954381912,
        humidity: 0.49083083734874067,
        windspeed: 1.3766033326608307,
      },
      prediction_activity: { x: 0.49347548498039384, y: 0.6781989576323655 },
      last_prediction_deviation: 0.6056454797702248,
    },
    {
      time: "2023-05-04T00:10:00.000000+00:00",
      raw_activity: { x: 0.8876375399088146, y: 0.8951389885063404 },
      weather: {
        temp: 23.0712427787486,
        humidity: 0.5983917028556871,
        windspeed: 0.24690722654385877,
      },
      prediction_activity: { x: 0.22284341679885933, y: 0.3979323042752321 },
      last_prediction_deviation: 0.8580003027856503,
    },
    {
      time: "2023-05-04T00:15:00.000000+00:00",
      raw_activity: { x: 0.4750131292246029, y: 0.39593664470288226 },
      weather: {
        temp: 24.90091781357261,
        humidity: 0.7880832418342506,
        windspeed: 5.006209328171272,
      },
      prediction_activity: { x: 0.4503988756891161, y: 0.499093378864902 },
      last_prediction_deviation: 0.9449882039257732,
    },
    {
      time: "2023-05-04T00:20:00.000000+00:00",
      raw_activity: { x: 0.204479950476116, y: 0.4954625848223001 },
      weather: {
        temp: 22.860248283795364,
        humidity: 0.35661279342581886,
        windspeed: 8.349195060470072,
      },
      prediction_activity: { x: 0.20297429909982279, y: 0.5832335361512356 },
      last_prediction_deviation: 0.3608267680352627,
    },
    {
      time: "2023-05-04T00:25:00.000000+00:00",
      raw_activity: { x: 0.48192103626208915, y: 0.06691068181862703 },
      weather: {
        temp: 21.10722193396911,
        humidity: 0.5898151873904641,
        windspeed: 8.291633231620635,
      },
      prediction_activity: { x: 0.8681657487787448, y: 0.009971950575752286 },
      last_prediction_deviation: 0.7851464433845008,
    },
    {
      time: "2023-05-04T00:30:00.000000+00:00",
      raw_activity: { x: 0.31550060864684215, y: 0.341204188114963 },
      weather: {
        temp: 20.931431987498577,
        humidity: 0.7297497497466346,
        windspeed: 5.591958881536023,
      },
      prediction_activity: { x: 0.4324949230771692, y: 0.84031685935504 },
      last_prediction_deviation: 0.4122130303322603,
    },
    {
      time: "2023-05-04T00:35:00.000000+00:00",
      raw_activity: { x: 0.29841154795173297, y: 0.7736091033029876 },
      weather: {
        temp: 20.60679442212206,
        humidity: 0.8754798965386821,
        windspeed: 4.715266515518879,
      },
      prediction_activity: { x: 0.4349156366723468, y: 0.6517703754739473 },
      last_prediction_deviation: 0.9812418141979021,
    },
    {
      time: "2023-05-04T00:40:00.000000+00:00",
      raw_activity: { x: 0.5961697037360654, y: 0.6646719879197006 },
      weather: {
        temp: 28.28618924817828,
        humidity: 0.2157185980307197,
        windspeed: 9.864868764154574,
      },
      prediction_activity: { x: 0.12588189830497232, y: 0.5758236892627626 },
      last_prediction_deviation: 0.6336386372456126,
    },
    {
      time: "2023-05-04T00:45:00.000000+00:00",
      raw_activity: { x: 0.09629516287331885, y: 0.6704543988141224 },
      weather: {
        temp: 29.396526914033572,
        humidity: 0.8389358655482325,
        windspeed: 0.8420925359242626,
      },
      prediction_activity: { x: 0.5066924632632858, y: 0.03662405410179115 },
      last_prediction_deviation: 0.7485984564071321,
    },
    {
      time: "2023-05-04T00:50:00.000000+00:00",
      raw_activity: { x: 0.9226510936527004, y: 0.8393133043855439 },
      weather: {
        temp: 22.32610442445148,
        humidity: 0.2101703141045138,
        windspeed: 2.076397515837516,
      },
      prediction_activity: { x: 0.996202688585969, y: 0.5353885139915932 },
      last_prediction_deviation: 0.7651772122694573,
    },
    {
      time: "2023-05-04T00:55:00.000000+00:00",
      raw_activity: { x: 0.5686785347637835, y: 0.9865389963532613 },
      weather: {
        temp: 28.10212825631946,
        humidity: 0.8370926029427526,
        windspeed: 7.264350040514599,
      },
      prediction_activity: { x: 0.6739525243142079, y: 0.3063107942776847 },
      last_prediction_deviation: 0.27708508431328494,
    },
    {
      time: "2023-05-04T01:00:00.000000+00:00",
      raw_activity: { x: 0.9217447957271103, y: 0.7193296468731141 },
      weather: {
        temp: 20.573456747292187,
        humidity: 0.9840642852128196,
        windspeed: 1.9872515881196806,
      },
      prediction_activity: { x: 0.20167430926621976, y: 0.496537954513643 },
      last_prediction_deviation: 0.11577593528205332,
    },
    {
      time: "2023-05-04T01:05:00.000000+00:00",
      raw_activity: { x: 0.2418772554308276, y: 0.6241916001449109 },
      weather: {
        temp: 21.288684145269865,
        humidity: 0.8491916469308318,
        windspeed: 1.94239614660205,
      },
      prediction_activity: { x: 0.5973301218897589, y: 0.18408858809985174 },
      last_prediction_deviation: 0.35711399695862556,
    },
    {
      time: "2023-05-04T01:10:00.000000+00:00",
      raw_activity: { x: 0.06747239872125887, y: 0.8916983299804808 },
      weather: {
        temp: 23.206724610743677,
        humidity: 0.5089466123397093,
        windspeed: 8.20910756013329,
      },
      prediction_activity: { x: 0.34836259378793766, y: 0.6185487803265732 },
      last_prediction_deviation: 0.6207199942358718,
    },
    {
      time: "2023-05-04T01:15:00.000000+00:00",
      raw_activity: { x: 0.46278933825413293, y: 0.04265769604662706 },
      weather: {
        temp: 22.497881825791527,
        humidity: 0.8517764191305043,
        windspeed: 1.2718016944137556,
      },
      prediction_activity: { x: 0.941656653308931, y: 0.2520624042024001 },
      last_prediction_deviation: 0.24244833969867918,
    },
    {
      time: "2023-05-04T01:20:00.000000+00:00",
      raw_activity: { x: 0.5521337137548749, y: 0.2560758069784521 },
      weather: {
        temp: 23.6098560363459,
        humidity: 0.2214494895100697,
        windspeed: 2.8695396703873097,
      },
      prediction_activity: { x: 0.907784136339968, y: 0.36560509004426023 },
      last_prediction_deviation: 0.16276796114041325,
    },
    {
      time: "2023-05-04T01:25:00.000000+00:00",
      raw_activity: { x: 0.5129537397489814, y: 0.7709957527725763 },
      weather: {
        temp: 25.05707445524532,
        humidity: 0.24809861919587295,
        windspeed: 2.1746924536231282,
      },
      prediction_activity: { x: 0.2533323484369149, y: 0.045766415250899306 },
      last_prediction_deviation: 0.9075578184830372,
    },
    {
      time: "2023-05-04T01:30:00.000000+00:00",
      raw_activity: { x: 0.820191489965062, y: 0.46271965738864274 },
      weather: {
        temp: 23.107363988272954,
        humidity: 0.9870213606709372,
        windspeed: 7.834278868165036,
      },
      prediction_activity: { x: 0.7728356769203185, y: 0.5406197086458127 },
      last_prediction_deviation: 0.7064999582326745,
    },
    {
      time: "2023-05-04T01:35:00.000000+00:00",
      raw_activity: { x: 0.35948903826036416, y: 0.6565176791817876 },
      weather: {
        temp: 28.428309024868966,
        humidity: 0.2295956300547891,
        windspeed: 8.129020996622941,
      },
      prediction_activity: { x: 0.7513317840519123, y: 0.36324539466742145 },
      last_prediction_deviation: 0.299856059898012,
    },
    {
      time: "2023-05-04T01:40:00.000000+00:00",
      raw_activity: { x: 0.3587820209506861, y: 0.9430988224563438 },
      weather: {
        temp: 24.990414304588406,
        humidity: 0.07187846587122948,
        windspeed: 3.9861041083175297,
      },
      prediction_activity: { x: 0.1362849726852733, y: 0.8889929854162955 },
      last_prediction_deviation: 0.9679565329331541,
    },
    {
      time: "2023-05-04T01:45:00.000000+00:00",
      raw_activity: { x: 0.08327843884153596, y: 0.022955407438846387 },
      weather: {
        temp: 22.248857576811055,
        humidity: 0.4288562430771614,
        windspeed: 9.741578595745606,
      },
      prediction_activity: { x: 0.42044075362373345, y: 0.05201860712037076 },
      last_prediction_deviation: 0.755646258139594,
    },
    {
      time: "2023-05-04T01:50:00.000000+00:00",
      raw_activity: { x: 0.5914221393098159, y: 0.4659752311724432 },
      weather: {
        temp: 22.37623229336168,
        humidity: 0.7407079503801899,
        windspeed: 9.456251430600702,
      },
      prediction_activity: { x: 0.09922714401184851, y: 0.5815291560213939 },
      last_prediction_deviation: 0.43780085869766494,
    },
    {
      time: "2023-05-04T01:55:00.000000+00:00",
      raw_activity: { x: 0.2879539193143694, y: 0.047227635409490376 },
      weather: {
        temp: 25.829258736996977,
        humidity: 0.18786636126436518,
        windspeed: 7.1819182461796665,
      },
      prediction_activity: { x: 0.08381059259007995, y: 0.46605769293966903 },
      last_prediction_deviation: 0.7542586130352648,
    },
    {
      time: "2023-05-04T02:00:00.000000+00:00",
      raw_activity: { x: 0.5896679593224222, y: 0.8803356546969481 },
      weather: {
        temp: 20.93931611048178,
        humidity: 0.3569393769191591,
        windspeed: 3.6794793501215617,
      },
      prediction_activity: { x: 0.8828184621120821, y: 0.30273677016390665 },
      last_prediction_deviation: 0.2370583721206141,
    },
    {
      time: "2023-05-04T02:05:00.000000+00:00",
      raw_activity: { x: 0.11350247043789641, y: 0.875832386067184 },
      weather: {
        temp: 24.008825054127936,
        humidity: 0.3437444200425557,
        windspeed: 8.45894983908768,
      },
      prediction_activity: { x: 0.7512752718413953, y: 0.6426935927153256 },
      last_prediction_deviation: 0.9125916663102749,
    },
    {
      time: "2023-05-04T02:10:00.000000+00:00",
      raw_activity: { x: 0.6711950639565374, y: 0.7781023847192922 },
      weather: {
        temp: 22.49770828592558,
        humidity: 0.9861144045270638,
        windspeed: 4.46097424715315,
      },
      prediction_activity: { x: 0.20393979219308567, y: 0.23539680178799638 },
      last_prediction_deviation: 0.9036905470134334,
    },
    {
      time: "2023-05-04T02:15:00.000000+00:00",
      raw_activity: { x: 0.013575459608361706, y: 0.25481465300096384 },
      weather: {
        temp: 29.526517008638386,
        humidity: 0.6928558622893094,
        windspeed: 7.189395249936562,
      },
      prediction_activity: { x: 0.5992466704814291, y: 0.39803468901637973 },
      last_prediction_deviation: 0.277800413176833,
    },
    {
      time: "2023-05-04T02:20:00.000000+00:00",
      raw_activity: { x: 0.6094516688778787, y: 0.45064845111735397 },
      weather: {
        temp: 27.091303432235538,
        humidity: 0.8569123646888984,
        windspeed: 2.879663060672788,
      },
      prediction_activity: { x: 0.9726578897704737, y: 0.881813854578819 },
      last_prediction_deviation: 0.6973007288162798,
    },
    {
      time: "2023-05-04T02:25:00.000000+00:00",
      raw_activity: { x: 0.3453306358286914, y: 0.7924830853470987 },
      weather: {
        temp: 23.86012548469437,
        humidity: 0.24911427428379895,
        windspeed: 1.6843016840354696,
      },
      prediction_activity: { x: 0.7100048303638054, y: 0.7984543640175882 },
      last_prediction_deviation: 0.4905236060204493,
    },
    {
      time: "2023-05-04T02:30:00.000000+00:00",
      raw_activity: { x: 0.9881378179601744, y: 0.8419372695387674 },
      weather: {
        temp: 21.372995413267244,
        humidity: 0.1262127200886498,
        windspeed: 0.29418345099188836,
      },
      prediction_activity: { x: 0.13131942856808954, y: 0.8454843504291152 },
      last_prediction_deviation: 0.7737411556696427,
    },
    {
      time: "2023-05-04T02:35:00.000000+00:00",
      raw_activity: { x: 0.21019308356294908, y: 0.012364688813601865 },
      weather: {
        temp: 28.081590890739356,
        humidity: 0.3391068592849944,
        windspeed: 1.5479277169211625,
      },
      prediction_activity: { x: 0.7009028640387751, y: 0.062131185440339354 },
      last_prediction_deviation: 0.5878399534176152,
    },
    {
      time: "2023-05-04T02:40:00.000000+00:00",
      raw_activity: { x: 0.48278606950860703, y: 0.303915731178371 },
      weather: {
        temp: 25.886607487763136,
        humidity: 0.6235044413740567,
        windspeed: 3.188745716047393,
      },
      prediction_activity: { x: 0.9853421340348367, y: 0.8659782704645296 },
      last_prediction_deviation: 0.06457342022027712,
    },
    {
      time: "2023-05-04T02:45:00.000000+00:00",
      raw_activity: { x: 0.36569404554010176, y: 0.929360928030971 },
      weather: {
        temp: 22.64558488010252,
        humidity: 0.232780811570916,
        windspeed: 4.9453243750709,
      },
      prediction_activity: { x: 0.6651776336357158, y: 0.528639120931554 },
      last_prediction_deviation: 0.5461332663225889,
    },
    {
      time: "2023-05-04T02:50:00.000000+00:00",
      raw_activity: { x: 0.7852492165228525, y: 0.46956683688075307 },
      weather: {
        temp: 25.202090076657143,
        humidity: 0.46120562202603055,
        windspeed: 7.70923361299789,
      },
      prediction_activity: { x: 0.42439240632096353, y: 0.5764206753160733 },
      last_prediction_deviation: 0.7659864895486967,
    },
    {
      time: "2023-05-04T02:55:00.000000+00:00",
      raw_activity: { x: 0.11975036023270835, y: 0.38973211994107093 },
      weather: {
        temp: 29.616905339129026,
        humidity: 0.5126278933777563,
        windspeed: 8.703810839240255,
      },
      prediction_activity: { x: 0.10347312459940872, y: 0.09465368330384027 },
      last_prediction_deviation: 0.20653557659845856,
    },
    {
      time: "2023-05-04T03:00:00.000000+00:00",
      raw_activity: { x: 0.05993687292469008, y: 0.40338056040074366 },
      weather: {
        temp: 24.861074208395074,
        humidity: 0.12628070371978628,
        windspeed: 5.8446591731265904,
      },
      prediction_activity: { x: 0.5712754489850627, y: 0.4716121903168703 },
      last_prediction_deviation: 0.08957671845563575,
    },
    {
      time: "2023-05-04T03:05:00.000000+00:00",
      raw_activity: { x: 0.14494812762873033, y: 0.6898456173799388 },
      weather: {
        temp: 21.415484428887456,
        humidity: 0.746924694029281,
        windspeed: 2.4454866542667664,
      },
      prediction_activity: { x: 0.7476236298543381, y: 0.4487161369994612 },
      last_prediction_deviation: 0.6579382009343432,
    },
    {
      time: "2023-05-04T03:10:00.000000+00:00",
      raw_activity: { x: 0.9118376393928945, y: 0.24364988202576976 },
      weather: {
        temp: 27.987023039091344,
        humidity: 0.14955627759476053,
        windspeed: 0.3768569547555001,
      },
      prediction_activity: { x: 0.5468054456962664, y: 0.2330892314353078 },
      last_prediction_deviation: 0.10524921287447453,
    },
    {
      time: "2023-05-04T03:15:00.000000+00:00",
      raw_activity: { x: 0.09408661613078162, y: 0.00793049349964381 },
      weather: {
        temp: 20.387172760139116,
        humidity: 0.04281949039389399,
        windspeed: 3.70937588809632,
      },
      prediction_activity: { x: 0.9234376936356741, y: 0.7791405554594424 },
      last_prediction_deviation: 0.21044990775242034,
    },
    {
      time: "2023-05-04T03:20:00.000000+00:00",
      raw_activity: { x: 0.07592568694840351, y: 0.3229658181866628 },
      weather: {
        temp: 27.76342620769781,
        humidity: 0.46218599480865596,
        windspeed: 7.625296201179604,
      },
      prediction_activity: { x: 0.7806429217811445, y: 0.7088739427700703 },
      last_prediction_deviation: 0.8564483152157183,
    },
    {
      time: "2023-05-04T03:25:00.000000+00:00",
      raw_activity: { x: 0.623748992610427, y: 0.17804487921067047 },
      weather: {
        temp: 23.76275296534968,
        humidity: 0.2885786065919316,
        windspeed: 6.770319692913174,
      },
      prediction_activity: { x: 0.1374037762031176, y: 0.8319178878584886 },
      last_prediction_deviation: 0.49414306836966704,
    },
    {
      time: "2023-05-04T03:30:00.000000+00:00",
      raw_activity: { x: 0.9019148189343857, y: 0.4800828517759006 },
      weather: {
        temp: 25.95128477466384,
        humidity: 0.5302727965280931,
        windspeed: 7.073168112848091,
      },
      prediction_activity: { x: 0.34004630176417916, y: 0.628777479797784 },
      last_prediction_deviation: 0.026285815292033554,
    },
    {
      time: "2023-05-04T03:35:00.000000+00:00",
      raw_activity: { x: 0.07513902514749726, y: 0.6131742141899279 },
      weather: {
        temp: 24.18765641347921,
        humidity: 0.3491380408140292,
        windspeed: 3.7527564444219355,
      },
      prediction_activity: { x: 0.40447547379172366, y: 0.7806646633936385 },
      last_prediction_deviation: 0.3974359582772833,
    },
    {
      time: "2023-05-04T03:40:00.000000+00:00",
      raw_activity: { x: 0.06984685250057732, y: 0.43878568765658177 },
      weather: {
        temp: 22.511446244660952,
        humidity: 0.4016492853640584,
        windspeed: 3.0303540756097336,
      },
      prediction_activity: { x: 0.37242370755532905, y: 0.306039630426432 },
      last_prediction_deviation: 0.057869409669976335,
    },
    {
      time: "2023-05-04T03:45:00.000000+00:00",
      raw_activity: { x: 0.7995108475832808, y: 0.725816115050296 },
      weather: {
        temp: 24.48689916551813,
        humidity: 0.3494574047073771,
        windspeed: 9.424411494233194,
      },
      prediction_activity: { x: 0.8107381735836986, y: 0.2853584755966533 },
      last_prediction_deviation: 0.3246300944308742,
    },
    {
      time: "2023-05-04T03:50:00.000000+00:00",
      raw_activity: { x: 0.3141318345226235, y: 0.4418340515139677 },
      weather: {
        temp: 23.239673694554018,
        humidity: 0.7147429490743851,
        windspeed: 8.826568068936481,
      },
      prediction_activity: { x: 0.769316807416029, y: 0.6262239767827741 },
      last_prediction_deviation: 0.32815274118094295,
    },
    {
      time: "2023-05-04T03:55:00.000000+00:00",
      raw_activity: { x: 0.8635703197706508, y: 0.35881517724708234 },
      weather: {
        temp: 20.266276349203814,
        humidity: 0.4773325948972391,
        windspeed: 2.622630913864646,
      },
      prediction_activity: { x: 0.9976119004148901, y: 0.5671803048718622 },
      last_prediction_deviation: 0.6579804342766559,
    },
    {
      time: "2023-05-04T04:00:00.000000+00:00",
      raw_activity: { x: 0.9337614431604946, y: 0.3550014736856162 },
      weather: {
        temp: 20.960778595992167,
        humidity: 0.6079698134548774,
        windspeed: 1.4335116423378114,
      },
      prediction_activity: { x: 0.7970094225769712, y: 0.9118770599238127 },
      last_prediction_deviation: 0.03289443967055339,
    },
    {
      time: "2023-05-04T04:05:00.000000+00:00",
      raw_activity: { x: 0.3614086926743808, y: 0.1121303627717617 },
      weather: {
        temp: 23.465954134577622,
        humidity: 0.023749256685040798,
        windspeed: 7.602716519579367,
      },
      prediction_activity: { x: 0.023484222537605737, y: 0.5052224444988034 },
      last_prediction_deviation: 0.2702584779242073,
    },
    {
      time: "2023-05-04T04:10:00.000000+00:00",
      raw_activity: { x: 0.31708440027062645, y: 0.2618847211599479 },
      weather: {
        temp: 22.112150432437755,
        humidity: 0.20705624936177747,
        windspeed: 2.0454417022154536,
      },
      prediction_activity: { x: 0.26481065891904976, y: 0.9194293030271791 },
      last_prediction_deviation: 0.04046187088800168,
    },
    {
      time: "2023-05-04T04:15:00.000000+00:00",
      raw_activity: { x: 0.6307488123022328, y: 0.4658117705480692 },
      weather: {
        temp: 24.468751333225715,
        humidity: 0.631943267492103,
        windspeed: 6.905591902322255,
      },
      prediction_activity: { x: 0.5097364734055566, y: 0.9960987380873007 },
      last_prediction_deviation: 0.7523297315841191,
    },
    {
      time: "2023-05-04T04:20:00.000000+00:00",
      raw_activity: { x: 0.2946565509989725, y: 0.6663565060942582 },
      weather: {
        temp: 25.51045464742539,
        humidity: 0.8831316014153087,
        windspeed: 5.394654364067889,
      },
      prediction_activity: { x: 0.6299532444974927, y: 0.5656109726669043 },
      last_prediction_deviation: 0.6428376706881908,
    },
    {
      time: "2023-05-04T04:25:00.000000+00:00",
      raw_activity: { x: 0.9341414677124549, y: 0.7556820137868168 },
      weather: {
        temp: 29.883654938312368,
        humidity: 0.079258672364791,
        windspeed: 0.40981296723757166,
      },
      prediction_activity: { x: 0.19164118192234425, y: 0.8413303950013935 },
      last_prediction_deviation: 0.08367991352179627,
    },
    {
      time: "2023-05-04T04:30:00.000000+00:00",
      raw_activity: { x: 0.5554872071840369, y: 0.3026587056994541 },
      weather: {
        temp: 28.30716896749314,
        humidity: 0.6291835202674262,
        windspeed: 6.138673614481606,
      },
      prediction_activity: { x: 0.12848065796208274, y: 0.7903323186326127 },
      last_prediction_deviation: 0.5365362250174536,
    },
    {
      time: "2023-05-04T04:35:00.000000+00:00",
      raw_activity: { x: 0.9134317106681509, y: 0.2184380522006697 },
      weather: {
        temp: 27.216283665498246,
        humidity: 0.08328818268393445,
        windspeed: 8.808213431478007,
      },
      prediction_activity: { x: 0.5066053640753153, y: 0.5942524900947501 },
      last_prediction_deviation: 0.48831500291084595,
    },
    {
      time: "2023-05-04T04:40:00.000000+00:00",
      raw_activity: { x: 0.41371331757082563, y: 0.2630000500385441 },
      weather: {
        temp: 22.503695729041752,
        humidity: 0.3260769148426079,
        windspeed: 1.5805957012212424,
      },
      prediction_activity: { x: 0.9923192064855298, y: 0.043576603825146165 },
      last_prediction_deviation: 0.0002763651119915833,
    },
    {
      time: "2023-05-04T04:45:00.000000+00:00",
      raw_activity: { x: 0.5693000313894091, y: 0.7155798364609063 },
      weather: {
        temp: 21.329097841757154,
        humidity: 0.7171268122745829,
        windspeed: 6.245328641499257,
      },
      prediction_activity: { x: 0.22350126209988086, y: 0.32231728731114484 },
      last_prediction_deviation: 0.33309653985165766,
    },
    {
      time: "2023-05-04T04:50:00.000000+00:00",
      raw_activity: { x: 0.7692750944318697, y: 0.7021001014593451 },
      weather: {
        temp: 23.90824085789103,
        humidity: 0.10447153794713115,
        windspeed: 4.4474641060770015,
      },
      prediction_activity: { x: 0.42764880749258316, y: 0.3537741459747955 },
      last_prediction_deviation: 0.06835778777346213,
    },
    {
      time: "2023-05-04T04:55:00.000000+00:00",
      raw_activity: { x: 0.5709471988126402, y: 0.608663032321017 },
      weather: {
        temp: 20.29178454156355,
        humidity: 0.466149397393267,
        windspeed: 9.913435691201899,
      },
      prediction_activity: { x: 0.12563716229955513, y: 0.5760432069296734 },
      last_prediction_deviation: 0.03946213998415915,
    },
    {
      time: "2023-05-04T05:00:00.000000+00:00",
      raw_activity: { x: 0.3711211443231609, y: 0.5994445877878665 },
      weather: {
        temp: 21.3334045911884,
        humidity: 0.031238995651211354,
        windspeed: 2.4741512870459603,
      },
      prediction_activity: { x: 0.8712806119957974, y: 0.3479924314611944 },
      last_prediction_deviation: 0.8580326088526603,
    },
    {
      time: "2023-05-04T05:05:00.000000+00:00",
      raw_activity: { x: 0.19490839044739872, y: 0.8773857734267969 },
      weather: {
        temp: 23.102696776425347,
        humidity: 0.5349872105413944,
        windspeed: 1.8358128390949913,
      },
      prediction_activity: { x: 0.7777802737485262, y: 0.708074854540539 },
      last_prediction_deviation: 0.09599295793766727,
    },
    {
      time: "2023-05-04T05:10:00.000000+00:00",
      raw_activity: { x: 0.7875743149824446, y: 0.9953916341752714 },
      weather: {
        temp: 21.36889253353211,
        humidity: 0.3596611221168884,
        windspeed: 2.1612577215185427,
      },
      prediction_activity: { x: 0.970580100028982, y: 0.3743880472664165 },
      last_prediction_deviation: 0.8371744120473423,
    },
    {
      time: "2023-05-04T05:15:00.000000+00:00",
      raw_activity: { x: 0.38699146770355364, y: 0.37819132519863863 },
      weather: {
        temp: 28.297847265461108,
        humidity: 0.743308811044282,
        windspeed: 3.912807010482653,
      },
      prediction_activity: { x: 0.493630387106629, y: 0.3708260737636141 },
      last_prediction_deviation: 0.4411623986195854,
    },
    {
      time: "2023-05-04T05:20:00.000000+00:00",
      raw_activity: { x: 0.8480621230729284, y: 0.4979824381833621 },
      weather: {
        temp: 24.480588455167386,
        humidity: 0.6394120077778492,
        windspeed: 0.890299231750662,
      },
      prediction_activity: { x: 0.6912101966133811, y: 0.8633776194195465 },
      last_prediction_deviation: 0.3451538716377819,
    },
    {
      time: "2023-05-04T05:25:00.000000+00:00",
      raw_activity: { x: 0.1145728086827964, y: 0.48234060098985143 },
      weather: {
        temp: 26.650827591838887,
        humidity: 0.9339552456218548,
        windspeed: 3.4635252140122574,
      },
      prediction_activity: { x: 0.8075902917334434, y: 0.5465488940035199 },
      last_prediction_deviation: 0.7767030879968448,
    },
    {
      time: "2023-05-04T05:30:00.000000+00:00",
      raw_activity: { x: 0.2963402692610456, y: 0.7968739550289424 },
      weather: {
        temp: 20.976380655843073,
        humidity: 0.327925324895879,
        windspeed: 6.671421774740621,
      },
      prediction_activity: { x: 0.9750939849822423, y: 0.3839077906281504 },
      last_prediction_deviation: 0.9263971561176518,
    },
    {
      time: "2023-05-04T05:35:00.000000+00:00",
      raw_activity: { x: 0.5102433735283848, y: 0.3432321831333346 },
      weather: {
        temp: 23.50015799980119,
        humidity: 0.09158172658255725,
        windspeed: 3.258888115135771,
      },
      prediction_activity: { x: 0.7374961764985782, y: 0.2310138921565572 },
      last_prediction_deviation: 0.24074045002666344,
    },
    {
      time: "2023-05-04T05:40:00.000000+00:00",
      raw_activity: { x: 0.8407073147191729, y: 0.27569856285072847 },
      weather: {
        temp: 21.320532383377635,
        humidity: 0.6793112288728022,
        windspeed: 9.011628228413418,
      },
      prediction_activity: { x: 0.8761060411397078, y: 0.03597468600649101 },
      last_prediction_deviation: 0.1350513902501338,
    },
    {
      time: "2023-05-04T05:45:00.000000+00:00",
      raw_activity: { x: 0.30240346341407454, y: 0.8710137763173823 },
      weather: {
        temp: 25.0848623124332,
        humidity: 0.47517673185365794,
        windspeed: 0.9934716441065394,
      },
      prediction_activity: { x: 0.6041262361555876, y: 0.6204707327453262 },
      last_prediction_deviation: 0.7682568250141683,
    },
    {
      time: "2023-05-04T05:50:00.000000+00:00",
      raw_activity: { x: 0.32180108747427316, y: 0.36178734960196424 },
      weather: {
        temp: 21.14238091880463,
        humidity: 0.4928207579094933,
        windspeed: 6.762729513587638,
      },
      prediction_activity: { x: 0.034457591276036315, y: 0.8480547605232428 },
      last_prediction_deviation: 0.08095408776592228,
    },
    {
      time: "2023-05-04T05:55:00.000000+00:00",
      raw_activity: { x: 0.47451051314505843, y: 0.9525161733163172 },
      weather: {
        temp: 22.368626518313334,
        humidity: 0.6696236312427302,
        windspeed: 7.1922160508030375,
      },
      prediction_activity: { x: 0.35262982508842255, y: 0.5121923244526467 },
      last_prediction_deviation: 0.7212230314528922,
    },
    {
      time: "2023-05-04T06:00:00.000000+00:00",
      raw_activity: { x: 0.7492435497197867, y: 0.537511083134151 },
      weather: {
        temp: 29.090310562606142,
        humidity: 0.255395614938862,
        windspeed: 6.671133090089772,
      },
      prediction_activity: { x: 0.6685701448034072, y: 0.8132592872162269 },
      last_prediction_deviation: 0.011238042634722611,
    },
    {
      time: "2023-05-04T06:05:00.000000+00:00",
      raw_activity: { x: 0.2678808220897255, y: 0.45641797260283 },
      weather: {
        temp: 22.749558957229848,
        humidity: 0.3252836066589656,
        windspeed: 2.6478594432305327,
      },
      prediction_activity: { x: 0.1197296626815394, y: 0.7237082960981894 },
      last_prediction_deviation: 0.4517400413989532,
    },
    {
      time: "2023-05-04T06:10:00.000000+00:00",
      raw_activity: { x: 0.252245593276604, y: 0.7995433094921945 },
      weather: {
        temp: 23.088151706694934,
        humidity: 0.2623510129633303,
        windspeed: 6.099050762092895,
      },
      prediction_activity: { x: 0.44704282415745233, y: 0.554560223940916 },
      last_prediction_deviation: 0.9966226086363295,
    },
    {
      time: "2023-05-04T06:15:00.000000+00:00",
      raw_activity: { x: 0.04863875938459472, y: 0.1981580304900149 },
      weather: {
        temp: 27.19560024087448,
        humidity: 0.9604776558115551,
        windspeed: 9.531498576384166,
      },
      prediction_activity: { x: 0.08173672010153588, y: 0.9869716742104367 },
      last_prediction_deviation: 0.7937526859754565,
    },
    {
      time: "2023-05-04T06:20:00.000000+00:00",
      raw_activity: { x: 0.07926861118504791, y: 0.17929682803824876 },
      weather: {
        temp: 26.369416391319604,
        humidity: 0.9448737816977011,
        windspeed: 9.631275957250619,
      },
      prediction_activity: { x: 0.689803974548327, y: 0.25822976534666064 },
      last_prediction_deviation: 0.6318765996741729,
    },
    {
      time: "2023-05-04T06:25:00.000000+00:00",
      raw_activity: { x: 0.7120230806105574, y: 0.24789716887768887 },
      weather: {
        temp: 24.921995940865745,
        humidity: 0.5362473589341642,
        windspeed: 1.8204500733026963,
      },
      prediction_activity: { x: 0.804036230713542, y: 0.8759639778305084 },
      last_prediction_deviation: 0.890374466943846,
    },
    {
      time: "2023-05-04T06:30:00.000000+00:00",
      raw_activity: { x: 0.9096361349818058, y: 0.7915021675627232 },
      weather: {
        temp: 24.28464900334272,
        humidity: 0.16779916596756794,
        windspeed: 2.1883371667806095,
      },
      prediction_activity: { x: 0.722103818703575, y: 0.28338462037050205 },
      last_prediction_deviation: 0.6618526094690668,
    },
    {
      time: "2023-05-04T06:35:00.000000+00:00",
      raw_activity: { x: 0.10641628929028757, y: 0.18466879319979823 },
      weather: {
        temp: 28.4977506264841,
        humidity: 0.3829615344863434,
        windspeed: 9.096392951231502,
      },
      prediction_activity: { x: 0.8540205914958969, y: 0.4445231639522077 },
      last_prediction_deviation: 0.5410948117407329,
    },
    {
      time: "2023-05-04T06:40:00.000000+00:00",
      raw_activity: { x: 0.22849664449403873, y: 0.803790619123179 },
      weather: {
        temp: 23.230706720630163,
        humidity: 0.9792011086916775,
        windspeed: 2.5720580779401803,
      },
      prediction_activity: { x: 0.060711631451089154, y: 0.22033216504739583 },
      last_prediction_deviation: 0.7503273555853397,
    },
    {
      time: "2023-05-04T06:45:00.000000+00:00",
      raw_activity: { x: 0.18526058576950255, y: 0.7212199373153468 },
      weather: {
        temp: 29.893063910964187,
        humidity: 0.7782527632532178,
        windspeed: 1.6247662829957565,
      },
      prediction_activity: { x: 0.4885335812582777, y: 0.06920150185517271 },
      last_prediction_deviation: 0.42650511268403435,
    },
    {
      time: "2023-05-04T06:50:00.000000+00:00",
      raw_activity: { x: 0.4409157423481207, y: 0.7153326552189805 },
      weather: {
        temp: 27.05682262833796,
        humidity: 0.21059045939771914,
        windspeed: 5.406491969041596,
      },
      prediction_activity: { x: 0.6762448500783539, y: 0.35664844169309085 },
      last_prediction_deviation: 0.08555647893698026,
    },
    {
      time: "2023-05-04T06:55:00.000000+00:00",
      raw_activity: { x: 0.6639042471397649, y: 0.8045959432620586 },
      weather: {
        temp: 26.514774974805977,
        humidity: 0.49245918947628764,
        windspeed: 9.42397541819089,
      },
      prediction_activity: { x: 0.17704992362702499, y: 0.6778251792116443 },
      last_prediction_deviation: 0.7533568880599988,
    },
    {
      time: "2023-05-04T07:00:00.000000+00:00",
      raw_activity: { x: 0.3830727303691587, y: 0.1528062369206622 },
      weather: {
        temp: 29.76969900647316,
        humidity: 0.3211063168364202,
        windspeed: 3.1513320104397335,
      },
      prediction_activity: { x: 0.3671975270438621, y: 0.7785469348901616 },
      last_prediction_deviation: 0.6062170860361641,
    },
    {
      time: "2023-05-04T07:05:00.000000+00:00",
      raw_activity: { x: 0.2392672489294253, y: 0.9194997286682086 },
      weather: {
        temp: 24.531635658986644,
        humidity: 0.5526939765507367,
        windspeed: 0.39045936529532366,
      },
      prediction_activity: { x: 0.4225688026234624, y: 0.7958128874080547 },
      last_prediction_deviation: 0.6104966377904909,
    },
    {
      time: "2023-05-04T07:10:00.000000+00:00",
      raw_activity: { x: 0.04994707744823812, y: 0.10932791662266883 },
      weather: {
        temp: 28.74609352911114,
        humidity: 0.3157741442000106,
        windspeed: 5.400274374691879,
      },
      prediction_activity: { x: 0.3554509553842493, y: 0.09625095880320578 },
      last_prediction_deviation: 0.36818725150448084,
    },
    {
      time: "2023-05-04T07:15:00.000000+00:00",
      raw_activity: { x: 0.7108677027556262, y: 0.5754591294649817 },
      weather: {
        temp: 21.928040316606573,
        humidity: 0.44149037313342243,
        windspeed: 0.4437742638133768,
      },
      prediction_activity: { x: 0.6936243419405084, y: 0.6949649566082364 },
      last_prediction_deviation: 0.6624149228365165,
    },
    {
      time: "2023-05-04T07:20:00.000000+00:00",
      raw_activity: { x: 0.7278808389553922, y: 0.4915489234277892 },
      weather: {
        temp: 28.372679581881727,
        humidity: 0.9936500001294422,
        windspeed: 7.607037645202606,
      },
      prediction_activity: { x: 0.9296220680121977, y: 0.6006475439991061 },
      last_prediction_deviation: 0.45334838229436847,
    },
    {
      time: "2023-05-04T07:25:00.000000+00:00",
      raw_activity: { x: 0.9649177133278526, y: 0.6529984166557147 },
      weather: {
        temp: 27.684314575675906,
        humidity: 0.970818468158459,
        windspeed: 3.7704408426215386,
      },
      prediction_activity: { x: 0.3406487456723776, y: 0.1136175258784542 },
      last_prediction_deviation: 0.35569971196443995,
    },
    {
      time: "2023-05-04T07:30:00.000000+00:00",
      raw_activity: { x: 0.0659233203444427, y: 0.8205367187530239 },
      weather: {
        temp: 20.76450459658413,
        humidity: 0.7935836041507818,
        windspeed: 2.920556189575396,
      },
      prediction_activity: { x: 0.6903422558467236, y: 0.2637076424040923 },
      last_prediction_deviation: 0.9257179702415428,
    },
    {
      time: "2023-05-04T07:35:00.000000+00:00",
      raw_activity: { x: 0.8292066334007855, y: 0.30046848674023496 },
      weather: {
        temp: 23.691489158608043,
        humidity: 0.16636152767401213,
        windspeed: 9.403260032323333,
      },
      prediction_activity: { x: 0.47082720655053334, y: 0.16477567494572165 },
      last_prediction_deviation: 0.658651706593206,
    },
    {
      time: "2023-05-04T07:40:00.000000+00:00",
      raw_activity: { x: 0.5627552250115831, y: 0.8545336976720599 },
      weather: {
        temp: 27.509564059298818,
        humidity: 0.8325616678576062,
        windspeed: 7.168912566084998,
      },
      prediction_activity: { x: 0.6555799222006731, y: 0.3584075256599317 },
      last_prediction_deviation: 0.439775509406395,
    },
    {
      time: "2023-05-04T07:45:00.000000+00:00",
      raw_activity: { x: 0.15124489383222217, y: 0.421672257933834 },
      weather: {
        temp: 24.358178622835748,
        humidity: 0.7340314109700311,
        windspeed: 0.69122034321625,
      },
      prediction_activity: { x: 0.8915226873452325, y: 0.39781962570261187 },
      last_prediction_deviation: 0.9883007464906857,
    },
    {
      time: "2023-05-04T07:50:00.000000+00:00",
      raw_activity: { x: 0.9925484561150144, y: 0.49284313444382954 },
      weather: {
        temp: 24.231189092486133,
        humidity: 0.83301825235125,
        windspeed: 0.05828017984412903,
      },
      prediction_activity: { x: 0.935404344845409, y: 0.9043328508434585 },
      last_prediction_deviation: 0.24772003952733224,
    },
    {
      time: "2023-05-04T07:55:00.000000+00:00",
      raw_activity: { x: 0.4009560747158172, y: 0.7589974791910551 },
      weather: {
        temp: 25.84584620474301,
        humidity: 0.9443741847783197,
        windspeed: 7.2901107728885775,
      },
      prediction_activity: { x: 0.9429759055521136, y: 0.4218270512614788 },
      last_prediction_deviation: 0.4809567974851341,
    },
    {
      time: "2023-05-04T08:00:00.000000+00:00",
      raw_activity: { x: 0.8523480564869873, y: 0.6148198009742724 },
      weather: {
        temp: 25.851785264421906,
        humidity: 0.6568106441068946,
        windspeed: 2.7568139398797564,
      },
      prediction_activity: { x: 0.7333651744254102, y: 0.5786603240396617 },
      last_prediction_deviation: 0.9156120622180245,
    },
    {
      time: "2023-05-04T08:05:00.000000+00:00",
      raw_activity: { x: 0.5466285900172466, y: 0.4070453588639824 },
      weather: {
        temp: 28.480370635314706,
        humidity: 0.24872721517655005,
        windspeed: 6.534738120890632,
      },
      prediction_activity: { x: 0.1935226023955542, y: 0.729504831435149 },
      last_prediction_deviation: 0.09364054200864003,
    },
    {
      time: "2023-05-04T08:10:00.000000+00:00",
      raw_activity: { x: 0.19553771628374628, y: 0.23494459976234838 },
      weather: {
        temp: 26.3867979374432,
        humidity: 0.8783606339446818,
        windspeed: 3.0680369335910465,
      },
      prediction_activity: { x: 0.06763361234356735, y: 0.6834072330979428 },
      last_prediction_deviation: 0.5082362426950282,
    },
    {
      time: "2023-05-04T08:15:00.000000+00:00",
      raw_activity: { x: 0.237218906057031, y: 0.4496230125441131 },
      weather: {
        temp: 26.916071342779887,
        humidity: 0.6536750001539545,
        windspeed: 7.539226861058221,
      },
      prediction_activity: { x: 0.5813204632263593, y: 0.4399160381092898 },
      last_prediction_deviation: 0.9985042210501326,
    },
  ];

  const time = data.map((dataPoint) => dataPoint.time); // extract time value from each data point

  const temp = data
    .map((dataPoint) => dataPoint.weather.temp) // extract temp value from each data point
    .filter((temp) => typeof temp === "number"); // remove any non-number temp values

  const x = data
    .map((dp) => dp.raw_activity.x)
    .filter((x) => typeof x === "number"); // remove any non-number x values;

  const y = data
    .map((dp) => dp.raw_activity.y)
    .filter((y) => typeof y === "number"); // remove any non-number y values;

  const result = x.map((value, index) => {
    return {
      time: time[index],
      x: value,
      y: y[index],
      temp: temp[index],
    };
  });

  return (
    <ResponsiveContainer width="100%" height={360}>
      <AreaChart data={result}>
        <defs>
          <linearGradient id="tempColor" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={colors.orangeAccent[500]}
              stopOpacity={0.5}
            />
            <stop
              offset="75%"
              stopColor={colors.orangeAccent[500]}
              stopOpacity={0.06}
            />
          </linearGradient>
        </defs>
        <defs>
          <linearGradient id="xColor" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={colors.yellowAccent[500]}
              stopOpacity={0.5}
            />
            <stop
              offset="75%"
              stopColor={colors.yellowAccent[500]}
              stopOpacity={0.06}
            />
          </linearGradient>
        </defs>
        <defs>
          <linearGradient id="yColor" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={colors.pinkAccent[500]}
              stopOpacity={0.5}
            />
            <stop
              offset="75%"
              stopColor={colors.pinkAccent[500]}
              stopOpacity={0.06}
            />
          </linearGradient>
        </defs>
        <Area
          dataKey="x"
          yAxisId="bees"
          stroke={colors.yellowAccent[500]}
          fill="url(#xColor)"
          name="X"
        />
        <Area
          dataKey="y"
          yAxisId="bees"
          stroke={colors.pinkAccent[500]}
          fill="url(#yColor)"
          name="Y"
        />
        <Area
          dataKey="temp"
          yAxisId="temp"
          stroke={colors.orangeAccent[500]}
          fill="url(#tempColor)"
          name="Temperature"
        />

        <YAxis
          dataKey="temp"
          yAxisId="temp"
          orientation="right"
          axisLine={false}
          tickLine={false}
          tickCount={10}
          tickFormatter={(number) => `${number}°C`}
        />

        <YAxis
          dataKey="x"
          yAxisId="bees"
          axisLine={false}
          tickLine={false}
          tickCount={10}
        />
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          // tickFormatter={(str) => {
          //   const date = parseISO(str);
          //   if (date.getDate() % 7 === 0) {
          //     return format(date, "MMM, d");
          //   }
          //   return "";
          // }}
        />
        {/* <MyXAxis data={data} /> */}
        <Tooltip content={<CustomTooltip />} />
        <CartesianGrid opacity={0.1} vertical={false} />
        <Legend verticalAlign="bottom" height={36} />
      </AreaChart>
    </ResponsiveContainer>
  );
};
export default Graph;
