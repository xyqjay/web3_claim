
abstract class Job {
    abstract interval(): number;
    abstract do(): void;
  
    print(): void {
      console.log('HI!');
    }

    start(): void {
        this.do();
        const intervalId = setInterval(() => {
            const now = new Date();
            console.log(now.toString());
            this.do();
        }, this.interval());
        // console.log('intervalId:', intervalId);
        // clearInterval(intervalId);
    }
  }

  export {Job}