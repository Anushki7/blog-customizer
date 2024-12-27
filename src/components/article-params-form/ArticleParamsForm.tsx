import styles from './ArticleParamsForm.module.scss';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import clsx from 'clsx';

import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	OptionType,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

import { useState, useRef, useEffect } from 'react';

type ArticleParamsFormProps = {
	style: ArticleStateType;
	setStyle: (style: ArticleStateType) => void; // описание свойства
};

export const ArticleParamsForm = ({ style, setStyle } : ArticleParamsFormProps) => { 
	const [isOpen, setIsOpen] = useState(false);
	const [currentStyle, setCurrentStyle] = useState(style);

	const form = useRef<HTMLFormElement>(null);

	const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => { //Обработчик события отправки формы
		event.preventDefault();
		setStyle(currentStyle);
		setIsOpen(false);
	};

	const formResetHandler = () => { //Обработчик события сброса формы.
		setCurrentStyle(defaultArticleState);
		setStyle(defaultArticleState);
	};

	useEffect(() => { //добавляем и удаляем обработчики событий
		const closeEsc = (event: KeyboardEvent) => { // для закрытия формы клавишей Escape
			if (event.key === 'Escape') {
				setIsOpen(false);
			}
		};
		document.addEventListener('keydown', closeEsc);

		const handleClickOutside = (event: MouseEvent) => { // для закрытия формы при клике за пределами формы
			if (form.current && !form.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);

		return () => { // очистка обработчиков 
			document.removeEventListener('keydown', closeEsc);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const handleFontFamilyChange = (item: OptionType) => { //обновление свойства fontFamilyOption
		setCurrentStyle({ ...currentStyle, fontFamilyOption: item });
	};

	const handlerFontColorChange = (item: OptionType) => { //обновление свойства fontColor
		setCurrentStyle({ ...currentStyle, fontColor: item });
	};

	const handlerBackgroundChange = (item: OptionType) => { //обновление свойства backgroundColor
		setCurrentStyle({ ...currentStyle, backgroundColor: item });
	};

	const handlerContentWidthChange = (item: OptionType) => { //обновление свойства contentWidth
		setCurrentStyle({ ...currentStyle, contentWidth: item });
	};

	const handlerFontSizeChange = (item: OptionType) => { //обновление свойства fontSizeOption
		setCurrentStyle({ ...currentStyle, fontSizeOption: item });
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form 
				ref={form}
				onSubmit={formSubmitHandler} //Обработчик события отправки формы
				onReset={formResetHandler} //Обработчик события сброса формы
				className={styles.form}>
					
					<Text as='h2' size={31} weight={800} family={'open-sans'} uppercase>
						Задайте параметры
				    </Text>

				    <Select
				        title='Шрифт'
					    options={fontFamilyOptions}
					    selected={currentStyle.fontFamilyOption}
					    onChange={handleFontFamilyChange}
				    />

				    <RadioGroup
					    name='font size'
					    title='Размер шрифта'
					    options={fontSizeOptions}
					    selected={currentStyle.fontSizeOption}
					    onChange={handlerFontSizeChange}
				    />

				    <Select
					    title='Цвет шрифта'
					    options={fontColors}
					    selected={currentStyle.fontColor}
					    onChange={handlerFontColorChange}
				    />
				    
					<Separator/>

				    <Select
					    title='Цвет фона'
					    options={backgroundColors}
					    selected={currentStyle.backgroundColor}
					    onChange={handlerBackgroundChange}
				    />
					
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={currentStyle.contentWidth}
						onChange={handlerContentWidthChange}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
