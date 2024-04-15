import BodyText from '@enact/sandstone/BodyText';
import {Header, Panel} from '@enact/sandstone/Panels';
import Popup from '@enact/sandstone/Popup';
import ProgressBar from '@enact/sandstone/ProgressBar';

import $L from '@enact/i18n/$L';
import {useNetwork} from '../hooks/useNetwork';
import {useEffect} from 'react';
import {useProcStat} from '../hooks/useData';

const Main = props => {
	const {isInternetConnectionAvailable} = useNetwork();
	const value = useProcStat();
	useEffect(() => {
		console.log(
			'Main.js: isInternetConnectionAvailable:',
			isInternetConnectionAvailable
		);
	}, [isInternetConnectionAvailable]);

	useEffect(() => {
		console.log('Main.js: value:', value);
	}, [value]);

	return (
		<Panel {...props}>
			<Header title={$L('인터넷 연결중 ...')} />
			<BodyText>{$L('인터넷에 연결중입니다')}</BodyText>
			<ProgressBar progress={isInternetConnectionAvailable ? 1 : 0.01} />
			<Popup open={!isInternetConnectionAvailable}>
				인터넷 연결에 실패했습니다.
			</Popup>
		</Panel>
	);
};

export default Main;
