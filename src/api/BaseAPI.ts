import HTTPTransport from '../utils/HTTPTransport';

export default abstract class BaseAPI {
  protected http: HTTPTransport;

  protected constructor(endpoint: string) {
    this.http = new HTTPTransport(endpoint);
  }

  public abstract create?(data: unknown): Promise<unknown>;

  public abstract read?(identifier?: string): Promise<unknown>;

  public abstract update?(data: unknown): Promise<unknown>;

  public abstract delete?(identifier: unknown): Promise<unknown>;
}


// import HTTPTransport from '../utils/HTTPTransport';

// export interface IResource {
//   content_size: number;
//   content_type: string;
//   filename: string;
//   id:number;
//   path: string;
//   upload_date: string;
//   user_id: number;
// }

// export interface IResouseReason extends IResource {
//   reason: string;
// }

// // абстрактный класс - у методов не может быть реализации
// export default abstract class BaseAPI {
//   protected http: HTTPTransport;

//   protected constructor(endpoint: string) {
//     this.http = new HTTPTransport(endpoint);
//   }

//   // методы могут быть переопределены в дочернем классе   
//   public abstract create?(data: unknown): Promise<unknown>;

//   public abstract read?(identifier?: string | number): Promise<unknown>;

//   public abstract update?(identifier: string | number, data: unknown): Promise<unknown>;

//   public abstract delete?(identifier: string | number): Promise<unknown>;
// }