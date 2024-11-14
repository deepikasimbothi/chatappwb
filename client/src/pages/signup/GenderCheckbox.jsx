import { useState } from 'react';
const GenderCheckbox = ({ handleChange }) => {
	const [selected, setSelected] = useState('');
	
	const handlecChange = (e) => {
		setSelected(e.target.value);
		handleChange(e);

	}

	return (
		<div className='flex'>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer`}>
					<span className='label-text'>Male</span>
					<input type='checkbox' name='gender' value='male' checked={selected === 'male'} onChange={handlecChange} className='checkbox border-gray-600' />
				</label>
			</div>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer`}>
					<span className='label-text'>Female</span>
					<input type='checkbox' name='gender' value='female'checked={selected === 'female'} onChange={handlecChange} className='checkbox border-slate-600' />
				</label>
			</div>
		</div>
	);
};
export default GenderCheckbox;
