import { IsWalletConnected } from '@/components/shared/is-wallet-connected'
import { LinkComponent } from '@/components/shared/link-component'
import { ButtonSSXLogin } from '@/integrations/sprucekit/components/button-ssx-login'
import { ButtonSSXLogout } from '@/integrations/sprucekit/components/button-ssx-logout'
import { cn } from '@/lib/utils'

import { IsSignedIn } from './is-signed-in'
import { IsSignedOut } from './is-signed-out'

interface BranchButtonLoginOrAccountProps {
  classNameButtonLogin?: string
  classNameButtonLogout?: string
}

export const BranchButtonLoginOrAccount = ({ classNameButtonLogin, classNameButtonLogout }: BranchButtonLoginOrAccountProps) => {
  return (
    <IsWalletConnected>
      <IsSignedIn>
        <div className="flex items-center gap-3">
          <ButtonSSXLogout className={classNameButtonLogout} />
          <LinkComponent className="menu-item" href="/account">
            <span className="">Account</span>
          </LinkComponent>
        </div>
      </IsSignedIn>
      <IsSignedOut>
        <ButtonSSXLogin className={cn('colormode', classNameButtonLogin)} />
      </IsSignedOut>
    </IsWalletConnected>
  )
}

export default BranchButtonLoginOrAccount
