import psycopg2
from .constants import RADIUS_HOST, RADIUS_PORT, RADIUS_USER, RADIUS_DB, RADIUS_PASSWORD

def radius_connection(username):
    conn = None
    try:
        conn = psycopg2.connect(f"dbname={RADIUS_DB} user={RADIUS_USER} password={RADIUS_PASSWORD} host={RADIUS_HOST} port={RADIUS_PORT}")
        
        cur = conn.cursor()
    
        cur.execute(f"select callingstationid, acctsessionid from radacct where username='{username}' and acctstoptime is null ")

        results = cur.fetchall()
        cur.close()

        return results
    
    except (Exception, psycopg2.DatabaseError) as e:
        if conn is not None:
            conn.close()

        raise Exception(f"Exception: (radius_connection) => {e}")
        

def ras_details(balance):
    conn = None
    try:
        conn = psycopg2.connect(f"dbname={RADIUS_DB} user={RADIUS_USER} password={RADIUS_PASSWORD} host={RADIUS_HOST} port={RADIUS_PORT}")
        
        cur = conn.cursor()
    
        cur.execute(f"""
            select radacctid as id, acctsessionid as OriginID, username as Account, acctstarttime as ConnectionTime, coalesce(shortname, 'UnknownRAS'),
            sum(acctinputoctets + acctoutputoctets) as TotalOctets, callingstationid as mac
            from radacct rda left join nas ns
            on split_part(text(rda.nasipaddress), '/', 1) = ns.nasname
            where username = '{balance}' and acctstoptime is null
            group by radacctid, acctsessionid, username, acctstarttime, shortname;
        """)

        results = cur.fetchall()
        cur.close()

        return results
    
    except (Exception, psycopg2.DatabaseError) as e:
        if conn is not None:
            conn.close()

        raise Exception(f"Exception: (radius_connection) => {e}")