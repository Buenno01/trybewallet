import React from 'react';
import User from '../../assets/User.svg';

type UserInfoProps = {
  email: string;
};

function UserInfo({ email }: UserInfoProps) {
  return (
    <p className="text-primary-green flex items-center gap-2">
      <span>
        <img src={ User } alt="Icone usuário" />
      </span>
      <span data-testid="email-field">
        {email}
      </span>
    </p>
  );
}

export default UserInfo;
