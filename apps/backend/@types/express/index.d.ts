/**
 * Extensions for express types
 */
import database from '../../src/models';

declare global{
    namespace Express{
        interface Request{
            user: database.Admin
        }
    }
}