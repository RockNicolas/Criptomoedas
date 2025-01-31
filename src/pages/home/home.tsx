import styles from './home.module.css'

export function Home() {

    return (
      <main className={styles.container}>
        <form className={styles.form}>
            <input
              type="text"
              placeholder="Digite o noem da moeda... Ex Bitcoin"
            
            />
            <button type="submit">
                

            </button>
        </form>
      </main>
    )
  }
  