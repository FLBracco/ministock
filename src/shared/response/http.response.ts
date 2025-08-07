import { Response } from "express";

export enum HtttpStatus {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}

export class HttpResponse{
    Ok(res: Response, data?: any): Response{
        return res.status(HtttpStatus.OK).json({
            status: HtttpStatus.OK,
            statusMsg: "Success",
            data: data
        })
    }
    Created(res: Response, data?: any): Response{
        return res.status(HtttpStatus.CREATED).json({
            status: HtttpStatus.CREATED,
            statusMsg: "Created successfully",
            data: data
        })
    }
    BadRequest(res: Response, data?: any): Response{
        return res.status(HtttpStatus.BAD_REQUEST).json({
            status: HtttpStatus.BAD_REQUEST,
            statusMsg: "Bad Request",
            error: data
        })
    }
    Unauthorized(res: Response, data?: any): Response{
        return res.status(HtttpStatus.UNAUTHORIZED).json({
            status: HtttpStatus.UNAUTHORIZED,
            statusMsg: "Unauthorized",
            error: data
        })
    }
    Forbidden(res: Response, data?: any): Response{
        return res.status(HtttpStatus.UNAUTHORIZED).json({
            status: HtttpStatus.FORBIDDEN,
            statusMsg: "Forbidden",
            error: data
        })
    }
    NotFound(res: Response, data?: any): Response{
        return res.status(HtttpStatus.NOT_FOUND).json({
            status: HtttpStatus.NOT_FOUND,
            statusMsg: "Not Found",
            error: data
        })
    }
    Error(res: Response, data?: any): Response{
        return res.status(HtttpStatus.INTERNAL_SERVER_ERROR).json({
            status: HtttpStatus.INTERNAL_SERVER_ERROR,
            statusMsg: "Internal Server Error",
            error: data
        })
    }
}