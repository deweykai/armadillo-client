import React from 'react';
import TrailerIcon from '@material-ui/icons/LocalShippingTwoTone';
import BikeIcon from '@material-ui/icons/DirectionsBike';
import GetApp from '@material-ui/icons/GetApp';
import Link from 'next/link';
import {useRouter} from 'next/router';

const ListLink = ({name, url, icon}) => (
    <Link href={url}>
        <a className="px-8 py-3 block hover:bg-gray-200 transition duration-200">{name}</a>
    </Link>
)

const NavDrawer = ({tid}) => (
    <List>

    </List>
);

const Sidebar = () => {
    const router = useRouter();
    const tid = Number(router.query.tid);

    return (
        <div className="w-48 absolute pt-12 bg-white shadow left-0 inset-y-0 z-10">
            <ListLink name="Trailer" url={`/trailer/${tid}`} icon={TrailerIcon} />
            <hr />
            <ListLink name="Bikes" url={`/trailer/${tid}/bike`} icon={BikeIcon} />
            <hr />
            <ListLink name="Oven" url={`/trailer/${tid}/oven`} icon={BikeIcon} />
            <hr />
            <ListLink name="Solar" url={`/trailer/${tid}/solar`} icon={BikeIcon} />
            <hr />
            <ListLink name="Download" url={`/trailer/${tid}/download`} icon={GetApp} />
        </div>
    );
};

export default Sidebar;
