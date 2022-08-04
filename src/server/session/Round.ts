class Round {
  startTime: number = 0;
  timeSpent: number = -1;
  timer: NodeJS.Timeout | null = null;

  constructor() {}
  startRound() {
    this.startTime = new Date().getTime();
  }

  endRound() {
    this.timeSpent = new Date().getTime() - this.startTime;
  }
}
