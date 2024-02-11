class MegaverseGameError extends Error {
  name = 'MegaverseGameError';
}

class MegaverseApiError extends Error {
  name = 'MegaverseApiError';
  status: number;

  constructor (message: string, status: number = undefined) {
    super(`${message} - Status: ${status}`);
    this.name = 'MegaverseApiError';
    this.status = status;
  }
}

export {
  MegaverseGameError,
  MegaverseApiError
};
