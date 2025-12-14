import styles from "../styles/components/newComboButton.module.css";

import plusIcon from "../assets/+.svg";

export function NewComboButton({onClick}) {
    return (
        <button onClick={() => onClick()} className={styles.new_combo_button}>
            <img src={plusIcon}/>
            New Combo
        </button>
    )
}