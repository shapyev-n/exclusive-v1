/* eslint-disable @typescript-eslint/no-unused-vars */
namespace TIME {
  type GetTimeResponse = ITime[];
  type GetTimeRequest = void;

  type PostTimeResponse = ITime[];
  type PostTimeRequest = {
    time: string;
  };
}
